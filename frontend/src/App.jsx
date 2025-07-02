import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { user } = useSelector((store) => store?.auth);
  console.log(user);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
