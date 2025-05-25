import app from 'firebase/app';
import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyB1AsBw6jTA8bhgNeJQk3W460U4Nx0BytE",
  authDomain: "tpfinalreactnativefbm.firebaseapp.com",
  projectId: "tpfinalreactnativefbm",
  storageBucket: "tpfinalreactnativefbm.firebasestorage.app",
  messagingSenderId: "45771976888",
  appId: "1:45771976888:web:d2071fee1c348d9bccc44d"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage()
export const db = app.firestore();

