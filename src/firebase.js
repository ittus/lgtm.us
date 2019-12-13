import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  appId: process.env.VUE_APP_FB_APP_ID
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

const IMAGE_NUM = 4000;

const randomImage = async () => {
  const found = false;
  while (!found) {
    const idx = Math.floor(Math.random() * IMAGE_NUM);
    const value = (
      await db
        .ref("images")
        .orderByChild("index")
        .equalTo(idx)
        .once("value")
    ).val();
    if (value) {
      return value;
    }
  }
};

const loadItemToReview = async () => {
  const value = (await db.ref("temp").once("value")).val();
  return value;
};

const getNextIndex = async () => {
  const value = (
    await db
      .ref("images")
      .orderByChild("index")
      .limitToLast(1)
      .once("value")
  ).val();
  const item = Object.values(value)[0];
  return item.index + 1;
};

export { db, auth, randomImage, storage, loadItemToReview, getNextIndex };
