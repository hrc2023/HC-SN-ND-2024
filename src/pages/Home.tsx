import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        p: 4,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to HC Social Network!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Connect, share, and explore with friends.
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          size="large"
        >
          Log In
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          color="secondary"
          size="large"
        >
          Sign Up
        </Button>
      </Box>
      <br/><br/>
      <Box>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Haoyang (Hendrick) Chen <br/>
        CS5610 Fall 2024
      </Typography>
      </Box>
    </Container>
  );
};

export default Home;
