import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

/**
 * Register component handles user registration.
 */
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  /**
   * Handles the form submission for registration.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationMessage("");

    if (password !== confirmPassword) {
      alert("Passwords don't match 💔");
      return;
    }

    console.log("Registration info:", { name, email, password });
    setRegistrationMessage(
      "We are thrilled you're trying to join BubblePharm! Unfortunately, registration is not implemented in this version. Thank you for your understanding! 💖"
    );
  };

  return (
    <div className="background">
      <div className="register-container">
        <div className="flower-icon">🌷</div>
        <h1>Join BubblePharm</h1>
        <p className="subtitle">Floral care, with love 💌</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Princess Peach"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@bubblepharm.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        {registrationMessage && (
          <p
            className="registration-success-message"
            style={{
              marginTop: "1.5rem",
              color: "#ff69b4",
              fontWeight: "bold",
            }}
          >
            {registrationMessage}
          </p>
        )}

        <div className="footer">
          🌸 Already a cutie here? <Link to="/">Login now</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
