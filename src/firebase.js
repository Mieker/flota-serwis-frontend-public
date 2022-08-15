import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SECRET",
  authDomain: "flotaserwis-id.firebaseapp.com",
  projectId: "flotaserwis-id",
  storageBucket: "flotaserwis-id.appspot.com",
  messagingSenderId: "SECRET",
  appId: "SECRET",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
