import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, googleProvider } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Get the ID token
          const token = await currentUser.getIdToken();

          // Try to get user data from Firestore, but don't fail if offline
          let userData = null;
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            userData = userDoc.exists() ? userDoc.data() : null;
          } catch (error) {
            console.warn("Could not fetch user data from Firestore:", error);
            // Try to get user data from localStorage as fallback
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              userData = JSON.parse(storedUser);
            }
          }

          // Store token and user data
          localStorage.setItem("authToken", token);
          const userToStore = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || userData?.name,
            photoURL: currentUser.photoURL,
          };
          localStorage.setItem("user", JSON.stringify(userToStore));

          setUser({
            ...currentUser,
            displayName: currentUser.displayName || userData?.name,
          });
        } else {
          // Clear stored data on logout
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with name
      await updateProfile(userCredential.user, { displayName: name });

      // Create user document in Firestore
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        console.warn("Could not create user document in Firestore:", error);
        // Store user data in localStorage as fallback
        localStorage.setItem(
          `user_${userCredential.user.uid}`,
          JSON.stringify({
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
          })
        );
      }

      return userCredential.user;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user document exists
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          // Create user document if it doesn't exist
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.warn(
          "Could not check/create user document in Firestore:",
          error
        );
        // Store user data in localStorage as fallback
        localStorage.setItem(
          `user_${user.uid}`,
          JSON.stringify({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
          })
        );
      }

      return user;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      // Clear stored data
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
