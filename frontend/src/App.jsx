import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import SingleProject from "./pages/SingleProject";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<SingleProject />} />
      </Routes>
    </div>
  );
};

export default App;
