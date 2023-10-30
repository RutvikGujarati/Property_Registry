import React, { useState } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import { useNavigate } from 'react-router-dom';


import image from "../img.jpg";
import land from "./owner.jpg";

const contractAddress = "0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B";
const ownerAddress = "0x14093F94E3D9E59D1519A9ca6aA207f88005918c";

const Owner = () => {
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const Navigate = useNavigate();

  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(contract, "ReturnAllLandIncpectorList", ownerAddress);

  if (error) {
    console.error("Failed to read contract", error);
  }

  const connectWithAddress = (event) => {
    event.preventDefault();
    if (metamaskAddress && isValidWalletAddress(metamaskAddress)) {
      // You can add further validation for the MetaMask address
      // Here, we are just checking if it's a valid address format
      if (metamaskAddress === ownerAddress) {
        // If the user connecting the wallet is the owner, redirect to the ContractOwner page
        // window.location.href = "/contractOwner"
        Navigate("/contractOwner")
      } else {
        // If it's not the owner, display an error message
        alert("You do not have permission to access the ContractOwner page.");
      }
    } else {
      alert("Please enter a correct MetaMask address.");
    }
  };

  const isValidWalletAddress = (address) => {
    // Replace this with your own validation logic
    const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return walletAddressRegex.test(address);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Call the onConnect callback when the wallet is successfully connected
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
        <img src={image} alt="Your Image" />
        {/* <ConnectWallet /> */}
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
          {/* <p>or login with Metamask</p>
          <button className="metamask-button" onClick={connectWallet}>
            Metamask
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Owner;
