const functions = require("firebase-functions");
const uuidv1 = require("uuid/v1");
const gm = require("gm").subClass({ imageMagick: true });
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const axios = require("axios");
// const admin = require("firebase-admin");
// admin.initializeApp();

async function downloadImage(url, path) {
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

exports.convertFile = functions.https.onRequest(async (req, res) => {
  console.log(req);
  const BUCKET_NAME = "lgtm-dev.appspot.com";
  const filePath = uuidv1();
  const url =
    "https://images.unsplash.com/photo-1573531107824-fd7b9c4f15a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
  const tempLocalPath = `/tmp/${filePath}`;

  // Download file from bucket.
  try {
    await downloadImage(url, tempLocalPath);
    console.log(`Downloaded ${url} to ${tempLocalPath}.`);
  } catch (err) {
    throw new Error(`File download failed: ${err}`);
  }

  await new Promise((resolve, reject) => {
    gm(tempLocalPath)
      .blur(0, 16)
      .write(tempLocalPath, (err, stdout) => {
        if (err) {
          console.error("Failed to blur image.", err);
          reject(err);
        } else {
          console.log(`Blurred image: ${url}`);
          resolve(stdout);
        }
      });
  });
  const blurredBucket = storage.bucket(BUCKET_NAME);

  const gcsPath = `gs://${BUCKET_NAME}/test/${filePath}`;
  try {
    await blurredBucket.upload(tempLocalPath, { destination: filePath });
    console.log(`Uploaded image to: ${gcsPath}`);
  } catch (err) {
    throw new Error(`Unable to upload blurred image to ${gcsPath}: ${err}`);
  }

  // Delete the temporary file.
  const unlink = promisify(fs.unlink);
  await unlink(tempLocalPath);
  return res.status(200, { status: "success" });
});
