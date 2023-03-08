import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <div className="login-wrapper">
      <img src="./shopping-cart.png" alt="" />

      <button onClick={() => signInWithPopup(auth, provider)} className="login-button">Sign In</button>
    </div>
  );
};

export default login;
