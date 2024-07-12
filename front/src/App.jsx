// src/App.js
import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Layout/navbar";
import Sidebar from "./Layout/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxWidth: "100%",
        marginLeft: 0, // Adjust margin as needed
      }}
    >
      <Navbar />

      <Outlet />
    </Box>
  );
}

export default App;
