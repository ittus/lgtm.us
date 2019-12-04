import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "AIzaSyDN1gtbmdRioqBumUBICls4fVUmrLNAcSc",
  authDomain: "lgtm-dev.firebaseapp.com",
  databaseURL: "https://lgtm-dev.firebaseio.com",
  projectId: "lgtm-dev",
  storageBucket: "lgtm-dev.appspot.com",
  messagingSenderId: "17035011926",
  appId: "1:17035011926:web:37778d560d87f2959518f7"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.database();
const auth = firebase.auth();

const IMAGE_NUM = 2900;

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

export { db, auth, randomImage };
