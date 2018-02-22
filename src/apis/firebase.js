// import firebase from "react-native-firebase";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDWMrob4ieV9UVEOCXUlDt19O9YAWAZveA",
  authDomain: "helstonbury-cadbf.firebaseapp.com",
  databaseURL: "https://helstonbury-cadbf.firebaseio.com",
  projectId: "helstonbury-cadbf",
  storageBucket: "helstonbury-cadbf.appspot.com",
  messagingSenderId: "597390507245"
};

// The firebase config with some extra app level stuff added.
export const extendedConfig = {
  ...config,
  thumbsPath: "img/bands/thumbs",
  cardsPhotoPath: "img/bands/cards"
};

firebase.initializeApp(config);

export default firebase;
