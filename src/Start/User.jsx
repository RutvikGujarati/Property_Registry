import React from "react";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom"; 
import "../styles/User.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import land from "../land.jpg";
import LoginUser from "./LoginUser";

const User = () => {
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Call the onConnect callback when the wallet is successfully connected
        window.location.href ="/loginUser";
        alert("Metamask successfully connected.");
      } else {
        alert("Please install Metamask or another Ethereum wallet to connect.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h4 className="lo">User Login</h4>
        <ConnectWallet />
      </div>
      <div className="image-section">
        <img src={land} alt="Your Image" />
      <div className="additional-div">
        <input className="input-box" placeholder="Enter your key" />
        <button className="continue-button">Continue</button>
        <p>or login with Metamask</p>
        <button className="metamask-button" onClick={connectWallet}>Metamask</button>
      </div>
      </div>
    </div>
  );
};

export default User;
