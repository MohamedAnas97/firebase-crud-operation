import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx7fMN7nD20otqM-k8X3glraSny7jigK8",
  authDomain: "profile-login-715b9.firebaseapp.com",
  projectId: "profile-login-715b9",
  storageBucket: "profile-login-715b9.appspot.com",
  messagingSenderId: "736488121626",
  appId: "1:736488121626:web:4a32f4df5041431c7b78a3",
  measurementId: "G-8JHG8W3G34"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
export default app;

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyB1l5-o7KXy1MGFX1PKwIohCj1qHNQ-gRc",
//   authDomain: "login-auth-8e9c1.firebaseapp.com",
//   projectId: "login-auth-8e9c1",
//   storageBucket: "login-auth-8e9c1.appspot.com",
//   messagingSenderId: "556128250424",
//   appId: "1:556128250424:web:dbba4de352f73a31a0d4cd",
// };


// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app); 
// export default app;
