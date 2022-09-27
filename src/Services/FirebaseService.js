import React, { useContext, useState, useEffect } from "react";
import { auth, provider, storage } from "./FirebaseApp";
import {
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateEmail,
  updatePhoneNumber
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
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function uploadURL(url) {
    fetch(url)
      .then((response) => {
        if (response.status == 200) {
          const photoURL = url;
          updateProfile(currentUser, { photoURL });
        }
      })
      .catch(() => {});
  }
  function upload(file) {
    const fileRef = ref(storage, currentUser.uid + file.name);
    console.log(fileRef);
    const snapshot = uploadBytes(fileRef, file).then(
      (data) => {
        console.log(data);
        getDownloadURL(fileRef).then((path) => {
          const photoURL = path;
          updateProfile(currentUser, { photoURL });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function updateEmailM(email) {
    return updateEmail(currentUser,email);
  }
  function updateName(Name){
    return updateProfile(currentUser, { displayName:Name });
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updatePhoneNumberM(number){
    return updatePhoneNumber(currentUser,number);
  }
  function updateFullProfile(
    uid,
    Email,
    Password,
    Name,
    phonenumber,
    photo,
    url,
    emailVerified
  ) {
    if(url){
      return auth.updateUser(uid, {
        email: Email,
        phoneNumber: phonenumber,
        emailVerified: emailVerified,
        password: Password,
        displayName: Name,
        photoURL: photo
      });
    }
    else{
      auth.updateUser(uid, {
        email: Email,
        phoneNumber: phonenumber,
        emailVerified: emailVerified,
        password: Password,
        displayName: Name
      });
      return upload(photo);
    }
    
  }
  function sendVerify() {
    return sendEmailVerification(currentUser);
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
    updateEmailM,
    updatePassword,
    signInWithGoogle,
    upload,
    uploadURL,
    sendVerify,
    updateFullProfile,
    updatePhoneNumberM,
    updateName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
