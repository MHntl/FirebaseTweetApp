import React, { useState } from "react";
import { auth, provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  //SignIn with Google
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => navigate("/feed"))
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          "ErrorCode :" + error.code,
          "ErrorMessage :" + error.message,
          "Email : " + error.customData.email,
          "Credential :" + credential
        );
      });
  };
  //SignIn and SignUp with Email-Pass
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp) {
      // Signed up
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          toast.success("Congratulations! Now You have an account");
          setSignUp(!signUp);
        })
        .catch((error) => toast.error(`Sorry! There is an error ${error.code}`));
    } else {
      // Signed in
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          toast.success("Signed In");
          setSignedIn(true);
          setError(false);
        })
        .catch((error) => {
          toast.error(`Sorry! There is an error ${error.code}`);
          if (error.code === "auth/invalid-login-credentials") {
            setError(true);
          }
        });
    }
  };
  //Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.info("Signed Out!");
        setSignedIn(false);
      })
      .catch((error) => {
        toast.error("Sorry!There is an error.");
      });
  };
  //Reset Password
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          "An email has been sent your mail account to reset password!"
        );
        // Password reset email sent!
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* LOGO */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="" />
        </div>
        <h1 className="text-center font-bold text-xl">Log in to Twitter</h1>
        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="flex items-center transition bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 hover:bg-gray-300"
        >
          <img className="h-[20px]" src="google-logo.svg" alt="google-logo" />
          <span className="whitespace-nowrap">Sign in with Google</span>
        </button>
        {/*Entry Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            required
          />
          <label htmlFor="">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />
          <div className="flex flex-col">
            <button className="bg-white font-bold transition hover:bg-gray-300 text-black mt-10 rounded-full p-1">
              {signUp ? "Sign Up" : "Sign In"}
            </button>
            {/* SignOut Button */}
            {signedIn && (
              <button
                type="button"
                onClick={() => handleSignOut()}
                className="bg-white font-bold transition hover:bg-gray-300 text-black mt-5 rounded-full p-1"
              >
                Sign Out
              </button>
            )}
          </div>
          <p className="mt-5 flex justify-between gap-4">
            <span>{signUp ? "Have an account ?" : "Don't have an account?"}</span>
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setSignUp(!signUp)}
            >
              {signUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
        {/*Invalid Password*/}
        {error && (
          <p
            className="flex text-red-500
           gap-3"
          >
            Forgot your password?
            <span
              onClick={() => resetPassword()}
              className="text-blue-500 cursor-pointer"
            >
              Reset
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
