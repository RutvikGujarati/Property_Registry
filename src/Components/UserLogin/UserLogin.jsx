import { Web3Button , useAddress} from '@thirdweb-dev/react'
import React, { useState } from 'react'
import abi from "../LandAbi.json"
import Web3 from 'web3'
import logo from "../../HomeComponents/estd.png"
import "../../HomeComponents/User/User.css"
import {Link} from "react-router-dom/dist"

// import { contract } from 'web3/lib/commonjs/eth.exports'

const UserLogin = () => {
  const address = useAddress()
  const [userList, setUserList] = useState("");
  const [isLoading , setIsLoading] =useState(true);

  const contractAddress = "0xd099a2d442E629693094e7dc904Eae4aFca930Bc"; 
  const contractAbi = abi;

  const fetchUserList = async () => {
  setIsLoading(true);

  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // Assuming your contract has a function named "ReturnAllUserList" to fetch user details
    const userAddresses = await contract.methods.ReturnAllUserList().call();

    // Use Promise.all to concurrently fetch user details for all addresses
    const userDetailsPromises = userAddresses.map(async (userAddress) => {
      const userDetail = await contract.methods.UserMapping(userAddress).call();
      return userDetail;
    });

    // Wait for all the promises to resolve and get the user details
    const userDetails = await Promise.all(userDetailsPromises);

    // "userDetails" now contains an array of user details
    setUserList(userDetails);

    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching user list:", error);
    setIsLoading(false);
  }
};


  return (
    <>
     <div className="body">
    <div className="navbar">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="series">
  
        <Link to="/dashboard">Dashboard</Link>
      
        <Link to="/addProperty">Add Properties</Link>
        <a href="/MyProperty">My Properties</a>
        <a href="/">Log Out</a>
      
      </div>

    </div>
    <div className="container1">
      <div className="login">
        {/* <ConnectWallet 
          
        /> */}
      </div>
      {/* <div>{isLoading ? <p>Loading...</p> : <p>user Registration: {data}</p>}</div> */}
      <div className="image-section">
        <div className="additional-div">
       
     <Web3Button
        contractAddress="0xd099a2d442E629693094e7dc904Eae4aFca930Bc"
        contractAbi={contractAbi} 
        action={fetchUserList}
        
        //ReturnAllUserList
        >Profile</Web3Button>
         {isLoading ? (
        <p></p>
      ) : (
        <ul>
          {userList.map((user, index) => (
            <li key={index}>
              <strong>Name: </strong>{user.name}
              <br />
             {/* <strong>Age: </strong>{user.age}
             <br /> */}
             <strong>City:</strong>{user.city}
             <br />
             <strong>AadharNumber:</strong>{user.aadharNumber}
             <br />
             <strong>PanNumber: </strong>{user.panNumber}
             <br />
             <strong>Email :</strong>{user.email}
            </li>
          ))}
        </ul>
      )}
        </div>
      </div>
    </div>
    </div>
    <div>
  </div>
  </>
  )
}

export default UserLogin
