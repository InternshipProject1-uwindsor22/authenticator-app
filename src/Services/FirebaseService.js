import React, { useContext, useState, useEffect } from "react";
import { auth, provider, storage } from "./FirebaseApp";
import {
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function signInWithGoogle() {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
