import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'


const firebaseConfig = {
  apikey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID
};

initializeApp(firebaseConfig)


const firestore = getFirestore()

const MESSAGES = 'messages'

export {

    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
}