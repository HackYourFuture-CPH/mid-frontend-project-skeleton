import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import hyfLogo from "../../assets/hyf.svg";
import "./HomePage.css";

function HomePage() {
  const {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authError, setAuthError] = useState(null);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setAuthError(null);
    try {
      if (isRegister) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setAuthError(err.message ?? "Auth failed");
    }
  }

  return (
    <>
      <a href="https://www.hackyourfuture.dk/" target="_blank" className="link">
        <img src={hyfLogo} alt="HackYourFuture logo" className="logo" />
      </a>
      <div className="auth-section">
        {loading && <span>Checking auth…</span>}
        {!loading && !user && (
          <>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="auth-btn">
              Sign in with Google
            </button>
            <form onSubmit={handleEmailSubmit} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
                autoComplete={isRegister ? "new-password" : "current-password"}
              />
              <button type="submit" className="auth-btn">
                {isRegister ? "Create account" : "Sign in with email"}
              </button>
              <button
                type="button"
                className="auth-link"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setAuthError(null);
                }}>
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Create an account"}
              </button>
            </form>
            {authError && <span className="auth-error">{authError}</span>}
          </>
        )}
        {!loading && user && (
          <div className="auth-user">
            <span>
              Signed in as {user.displayName ?? user.email}
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt=""
                  width={24}
                  height={24}
                  className="auth-avatar"
                />
              )}
            </span>
            <button type="button" onClick={signOut} className="auth-btn">
              Sign out
            </button>
          </div>
        )}
      </div>
      <a href="/nested" className="link">
        <span className="message">Go to the nested page</span>
      </a>
    </>
  );
}

export default HomePage;
