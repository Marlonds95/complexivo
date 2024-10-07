
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyCblHHhFj2EYG_eJqO12fnjHARtkhGwcOk",
  authDomain: "productsgames-1d865.firebaseapp.com",
  projectId: "productsgames-1d865",
  storageBucket: "productsgames-1d865.appspot.com",
  messagingSenderId: "589240375268",
  appId: "1:589240375268:web:6494bde1504db5822b19f1",
  dataBaseURL:"https://productsgames-1d865-default-rtdb.firebaseio.com/"
};


const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  export const dbRealTime = getDatabase(firebase)