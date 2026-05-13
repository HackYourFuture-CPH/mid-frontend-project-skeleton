// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success

import styles from "../Login/Login.module.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setError("");
  setSuccess("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      setSuccess("Account created successfully!");
      navigate('/login');

    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p className={styles.error}>{error}</p>}

      {success && <p className={styles.success}>{success}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
    </div>
  );
}
