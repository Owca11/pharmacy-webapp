import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Login.css";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        } as LoginRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data: LoginResponse = await response.json();

      // Store the token
      localStorage.setItem("authToken", data.token);

      // Redirect to home page
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="login-container">
        <div className="pill-icon">🌷</div>
        <h1>BubblePharm</h1>
        <p className="subtitle">Your trusted online pharmacy</p>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            type="text" // Changed from email to text for username
            id="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="username"
            label="Username"
            required
          />

          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="••••••••"
            label="Password"
            required
          />

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="auth-links">
            {/* <a href="#" className="forgot-password">
              Forgot password?
            </a> */}
            <Link to="/register" className="register-link">
              New here? Sign up
            </Link>
          </div>
        </form>

        <div className="footer">
          🌷 All medications require a prescription. 🌷
        </div>
      </div>
    </div>
  );
}

export default Login;
