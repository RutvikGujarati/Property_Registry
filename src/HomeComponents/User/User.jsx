import React from "react";
import { useEffect, useState } from "react";
import image from "../img.jpg"
import "./User.css"
import abi from "../../Components/LandAbi.json"
import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { useContractRead , useContract } from "@thirdweb-dev/react";
import { useNavigate } from "react-router";
import Web3 from "web3";
import logo from "../estd.png"
// import land from "../../land.jpg";

import land from "../../land.jpg";
import { Address } from "web3-eth-accounts/lib/commonjs/tx/address";
// import LoginUser from "../Components/LoginUser";

const contractAddress = "0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B";
const ownerAddress = "0x14093F94E3D9E59D1519A9ca6aA207f88005918c";

const User = () => {
  // const history = useHistory();
  const Navigate = useNavigate();
  
  
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [userAddress, setUserAddress] = useState(null);

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
      Navigate("/loginUser") // Navigate to the next page (LoginUser)
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

  // const handleSignIn = async () => {
  //   try {
  //     const web3 = new Web3(window.ethereum);
  //     const contract = new web3.eth.Contract(abi, contractAddress);
  //     const isUserRegistered = await contract.methods.isUserRegistered("0x2E981C681755D9fFA14Db5A2F1053d5Ecb715B37").call();

  //     if (isUserRegistered === true) {
  //       // User is registered, navigate to the login page
  //       Navigate('/userLogin');
  //     } else {
  //       // User is not registered, show an alert
  //       alert('Please register yourself first.');
  //     }
  //   } catch (error) {
  //     console.error('Error checking user registration:', error);
  //   }
  // };
  const handleSignIn = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts && accounts.length > 0) {
          const userAddress = accounts[0];
          setUserAddress(userAddress);

          // Initialize a Web3 instance with the current provider
          const web3 = new Web3(window.ethereum);

          // Replace with your contract address and ABI
          // const contractAddress = '';
          const contractAbi = abi;

          // Create a contract instance
          const contract = new web3.eth.Contract(contractAbi, contractAddress);

          // Call the isUserRegistered function to check if the user is registered
          const isRegistered = await contract.methods.isUserRegistered(userAddress).call();

          if (isRegistered) {
            // User is registered, navigate to the dashboard
            Navigate('/userLogin');
          } else {
            alert('User is not registered. Please register to access the dashboard.');
          }
        } else {
          alert('No accounts found in MetaMask. Please make sure you are connected to MetaMask.');
        }
      } else {
        alert('MetaMask not found. Please make sure you have MetaMask installed and unlocked.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  const connectWallet = async () => {
    try {
      if (isOwner) {
        alert("Owners are not allowed to access this page.");
      }
      else if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Call the onConnect callback when the wallet is successfully connected
        Navigate("/RegisterUser")
        alert("Metamask successfully connected.");
      } else {
        alert("Please install Metamask or another Ethereum wallet to connect.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    // <div className="container1">
    //   <div className="login">
    //     <img  src={image}></img>
    //     <ConnectWallet 
          
    //     />
    //   </div>
    //   {/* <div>{isLoading ? <p>Loading...</p> : <p>user Registration: {data}</p>}</div> */}
    //   <div className="image-section">
    //     <img src={land} alt="Your Image" />
    //     <div className="additional-div">
    //       <input
    //         className="input-box"
    //         placeholder="Enter your MetaMask address"
    //         value={metamaskAddress}
    //         onChange={(e) => setMetamaskAddress(e.target.value)}
    //       />
    //       <button className="continue-button" type="submit" onClick={connectWithAddress}>
    //         Continue
    //       </button>
    //       <p>login or Register with metamask</p>
    //       <button className="metamask-button" onClick={connectWallet}>
    //         Register 
    //       </button>

    //       <button className="continue-button" onClick={handleSignIn}>Sign In</button>
    //     </div>
    //   </div>
    // </div>
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
          <button className="metamask-button" onClick={ handleSignIn }>
            Sign In
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default User;
