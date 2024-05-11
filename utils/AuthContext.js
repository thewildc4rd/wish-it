'use client';

// import { React, createContext, useState, useEffect } from 'react';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  // const logIn = (email, password) => {
  //   return signInWithEmailAndPassword(email, password);
  // };

  // const logOut = () => {
  //   return signOut();
  // };

  // const signUp = (email, password) => {
  //   return createUserWithEmailAndPassword(email, password);
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initialiseUser);
    return unsubscribe;
  }, []);

  async function initialiseUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const values = {
    currentUser,
    userLoggedIn,
    loading,
    // logOut, logIn, signUp
  };

  return <AuthContext.Provider value={values}>{!loading && children}</AuthContext.Provider>;
}
