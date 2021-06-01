import React from "react";
import HomeScreen from "../Components/Screen/HomeScreen";
import img from "../assets/Group.svg";
import "./HomeP.css";
import img2 from "../assets/s.png";
import { useUserContext } from "../Context/UserContext";
const HomeP = () => {
  const { login } = useUserContext();
  return (
    <HomeScreen>
      <div className="fl">
        <div className="divider left">
          <p className="logo">Intract</p>
          <img
            src={img2}
            className="signinbtn"
            onClick={login}
            role="button"
            alt="Click to sign in"
          />
        </div>
        <div className="divider right">
          <img src={img} className="homeImg" alt="presentation" />
        </div>
      </div>
    </HomeScreen>
  );
};

export default HomeP;
