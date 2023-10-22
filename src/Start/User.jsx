import React from "react";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import "../styles/User.css";
import { ConnectWallet } from "@thirdweb-dev/react";

import land from "../land.jpg";
import LoginUser from "../Components/LoginUser";

const User = () => {
  // const history = useHistory();
  const [metamaskAddress, setMetamaskAddress] = useState("");

  const connectWithAddress = (event) => {
    // You can add further validation for the MetaMask address
    try{
      event.preventDefault(); // Prevent the default form submission behavior
      if (metamaskAddress && isValidWalletAddress(metamaskAddress)) {
      window.location.href = "/loginUser" // Navigate to the next page (LoginUser)
    }else{
      alert("please enter correct address!")
    }}catch{
      alert("paste the correct wallet address!")
    }
  };

  const isValidWalletAddress = (address) => {
    // Check if the address matches a valid wallet address format
    // Replace this with your own validation logic
    const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return walletAddressRegex.test(address);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Call the onConnect callback when the wallet is successfully connected
        window.location.href = "/loginUser";
        alert("Metamask successfully connected.");
      } else {
        alert("Please install Metamask or another Ethereum wallet to connect.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <div className="container1">
      <div className="login">
        <h4 className="lo">User Login</h4>
        <ConnectWallet 
          
        />
      </div>
      <div className="image-section">
        <img src={land} alt="Your Image" />
        <div className="additional-div">
          <input
            className="input-box"
            placeholder="Enter your MetaMask address"
            value={metamaskAddress}
            onChange={(e) => setMetamaskAddress(e.target.value)}
          />
          <button className="continue-button" type="submit" onClick={connectWithAddress}>
            Continue
          </button>
          <p>or login with Metamask</p>
          <button className="metamask-button" onClick={connectWallet}>
            Metamask
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
