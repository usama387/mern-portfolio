import React from "react";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store?.auth);
  console.log(user);

  return (
    <div className="">
      <Login />
    </div>
  );
};

export default Home;
