import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { LockOutlined } from "@mui/icons-material";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";
  
  const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleRegister = async () => {
        // Name Validation
        const nameRegex = /^[a-zA-Z0-9_ ]*$/;
        if (!nameRegex.test(name)) {
          alert("Name can only contain letters, numbers, spaces, and underscores.");
          return;
        }
      
        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          return;
        }
      
        // Password Validation
        if (password.length < 8) {
          alert("Password must be at least 8 characters long.");
          return;
        }
      
        // Confirm Password Check
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
      
        // Proceed with API request if all validations pass
        try {
          const response = await axios.post("http://localhost:5000/api/users/register", {
            name,
            email,
            password,
          });
          console.log("Registration successful", response.data);
          alert("Registration successful! Please log in.");
          window.location.href = "/login";
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message || "Registration failed. Please try again.");
          } else if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
            alert("Unexpected error occurred. Please try again.");
          } else {
            console.error("Unknown error:", error);
            alert("An unknown error occurred. Please try again.");
          }
        }
      };
      
  
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ mt: 2 }}
            >
              Back to Home Page
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default Register;
  