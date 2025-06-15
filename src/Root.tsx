import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "ProtectedRoute";

function Root() {
  return (
    <Routes>
      {" "}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        {/* Other protected routes */}
      </Route>
    </Routes>
  );
}

export default Root;
