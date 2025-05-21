import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (success) setTimeout(() => navigate("/login"), 1000);
  }, [success, navigate]);

  const register = async (email, username, password, role) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + "auth/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        }
      );
      if (!response.ok) {
        setError("Register Error");
        setEmail("");
        setUsername("");
        setPassword("");
        return;
      }
      setSuccess(true);
      setSuccessMessage("Register Successfull. Redirecting...");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, username, password);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{successMessage}</Alert>}
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="FirstName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={(e) => handleSubmit(e, "admin")}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
