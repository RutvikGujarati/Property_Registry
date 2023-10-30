import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from '../LandAbi.json';
import "./OwnerLogin.css"
import logo from "../../HomeComponents/estd.png"
import { Web3Button, useAddress } from '@thirdweb-dev/react';

const OwnerLogin = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [city, setCity] = useState('');
  const [InspectorList, setInspectorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const web3 = new Web3(window.ethereum);

  const Address = useAddress();

  const contractAddress = '0xd099a2d442E629693094e7dc904Eae4aFca930Bc'; // Replace with your contract address
  const ownerAddress = '0x14093F94E3D9E59D1519A9ca6aA207f88005918c'; // Replace with the owner's address

  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const fetchLandInspectorList = async () => {
    setIsLoading(true);

    try {
     // Assuming you have a contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Replace `landInspectorAddress` with the address you want to look up
const landInspectorAddress = '0x0f57Bd2d2645D12A11D0085F70C49C3d4E3Dee75'; // The address of the land inspector you want to fetch

// Call the contract function to check if the address is a registered land inspector
const isInspector = await contract.methods.isLandInspector(landInspectorAddress).call();

if (isInspector) {
  // If the address is a registered land inspector, fetch their details
  const inspectorDetails = await contract.methods.InspectorMapping(landInspectorAddress).call();
  
  // `inspectorDetails` now contains the details of the land inspector
  console.log('Land Inspector Details:', inspectorDetails);
} else {
  console.log('The provided address is not a registered land inspector.');
}

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user list:", error);
      setIsLoading(false);
    }
  };


  const addLandInspector = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Adding Land Inspector with account:', accounts[0]);

    try {
      await contract.methods
        .addLandInspector(accounts[0], name, age, designation, city)
        .send({ from: accounts[0] });
      console.log('Land Inspector added successfully.');
    } catch (error) {
      console.error('Error adding Land Inspector:', error);
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
        <a href="/contractOwner">Add Land Inspectors</a>
        <a href="/allInspectors">All Inspectors</a>
        <a href="/ChangeOwner">Change Ownership</a>
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
         
 <div className='container3'>
      <h2>Add Land Inspector</h2>
      <div className='input-container2'>
        <label>Address : </label>
        <input className='input-box ' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>Name:</label>
        <input className='input-box ' type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>Age:</label>
        <input className='input-box ' type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>Designation:</label>
        <input className='input-box ' type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>City:</label>
        <input className='input-box ' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      {/* <button className='submit-button' onClick={addLandInspector}>Add Land Inspector</button> */}
      <Web3Button
      contractAddress='0xd099a2d442E629693094e7dc904Eae4aFca930Bc'
      contractAbi={contractAbi}
      action={(contract)=> contract.call(
        "addLandInspector",
        [
          address,
          name,
          age,
          designation,
          city
        ]
      )}
      // action={addLandInspector}
      >
        add Land Inspector
      </Web3Button>
      <Web3Button
      contractAddress={contractAddress}
      contractAbi={contractAbi}
      action={fetchLandInspectorList}
      // action={(contract)=> contract.call(
      //   "getLandInspectorDetails"
      //   [
      //     "0x0f57Bd2d2645D12A11D0085F70C49C3d4E3Dee75"
      //   ]
      // )}
      >
        
        fetch LandInspector
      </Web3Button>
      {isLoading ? (
        <p>Loading Inspector list...</p>
      ) : (
        <ul>
          {InspectorList.map((Inspector, index) => (
            <li key={index}>
              <strong>Address: </strong>{Inspector.address}
              <br />
              <strong>Name: </strong>{Inspector.name}
              <br />
             {/* <strong>Age: </strong>{Inspector.age}
             <br /> */}
             <strong>Age:</strong>{Inspector.age}
             <br />
             <strong>Designation:</strong>{Inspector.designation}
             <br />
             <strong>City :</strong>{Inspector.city}
            </li>
          ))}
        </ul>
      )}
    </div>
         
        </div>
      </div>
    </div>
    </div>
   
    </>
  );
};

export default OwnerLogin;
