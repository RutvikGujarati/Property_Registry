import React from "react";
import { useEffect, useState } from "react";
import image from "../img.jpg"
import logo from "../estd.png"
import "./User.css"
// import { useHistory } from "react-router-dom";
import "./User.css";
// import Link from "react-router-dom/dist";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContractRead , useContract } from "@thirdweb-dev/react";
import land from "../../land.jpg";
// import LoginUser from "../../Components/LoginUser";

const contractAddress = "0xf7E9f7309146Dcd6201A1a86b48499022b229a19";
const ownerAddress = "0x14093F94E3D9E59D1519A9ca6aA207f88005918c";

const User = () => {
  // const history = useHistory();
  const [metamaskAddress, setMetamaskAddress] = useState("");

  const isOwner = metamaskAddress.toLowerCase() === ownerAddress.toLowerCase();

  const { contract } = useContract(contractAddress);

  // const { data, isLoading, error } = useContractRead(contract, "ReturnAllLandIncpectorList", "0x14093F94E3D9E59D1519A9ca6aA207f88005918c");

  // if (error) {
  //   console.error("failed to read contract", error);
  // }

  const connectWithAddress = (event) => {
    // You can add further validation for the MetaMask address
    try{
      event.preventDefault(); // Prevent the default form submission behavior
      if (metamaskAddress && isValidWalletAddress(metamaskAddress)) {
        if(isOwner){
          alert("Owners are not allowed to access the ContractOwner page.");
        }
        else{
          window.location.href = "/loginUser" // Navigate to the next page (LoginUser)

        }
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
      if (isOwner) {
        alert("Owners are not allowed to access this page.");
      }
      else if (window.ethereum) {
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
    <div className="body">
    <div className="navbar">
      <div className="logo">
        <img src={logo}></img>
      </div>
      {/* <div className="series">
        <a href="/dashboard">Dashboard</a>
        <a href="/addProperty">Add Properties</a>
        <a href="/Myproperty">My Properties</a>
        <a href="/logOut">Log Out</a>
      </div> */}

    </div>
    <div className="container1">
      <div className="login">
        {/* <ConnectWallet 
          
        /> */}
      </div>
      {/* <div>{isLoading ? <p>Loading...</p> : <p>user Registration: {data}</p>}</div> */}
      <div className="image-section">
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
          <button className="metamask-button" onClick={ connectWallet }>
            Metamask
          </button>
          <button className="metamask-button" onClick={ connectWallet }>
            Sign In
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default User;
