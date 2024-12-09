import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, role } = response.data;
        setName(name);
        setEmail(email);
        setStatus(role);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        alert("Failed to load profile. Please log in again.");
        window.location.href = "/login"; // Redirect if unauthorized
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must log in to update your profile.");
        return;
      }
  
      const response = await axios.put(
        "http://localhost:5000/api/users/me",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      alert("Profile updated successfully!");
      console.log("Updated profile:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to update profile. Please try again.");
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
        alert("Unexpected error occurred. Please try again.");
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred. Please try again.");
      }
    }
  };  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Profile
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="status"
                label="Status"
                value={status}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
