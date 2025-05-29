import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  initializeFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVcIMkgh9xeFi0999VBgtE87k-eIl_3K4",
  authDomain: "blood-harmony-foundation.firebaseapp.com",
  projectId: "blood-harmony-foundation",
  storageBucket: "blood-harmony-foundation.appspot.com",
  messagingSenderId: "681979082975",
  appId: "1:681979082975:web:16748a9c05f2d8fe65116a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore with custom settings
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: true, // Use long polling instead of WebSocket
  useFetchStreams: false, // Disable fetch streams
});

// Enable offline persistence
const enablePersistence = async () => {
  try {
    // Try to enable multi-tab persistence first
    await enableMultiTabIndexedDbPersistence(db);
    console.log("Multi-tab offline persistence enabled");
  } catch (err) {
    if (err.code === "failed-precondition") {
      // If multi-tab fails, try single-tab persistence
      try {
        await enableIndexedDbPersistence(db);
        console.log("Single-tab offline persistence enabled");
      } catch (singleTabErr) {
        console.warn("Single-tab persistence failed:", singleTabErr);
      }
    } else if (err.code === "unimplemented") {
      // The current browser doesn't support persistence
      console.warn("Persistence not supported by browser");
    } else {
      console.error("Error enabling persistence:", err);
    }
  }
};

// Call enablePersistence
enablePersistence();

export default app;
