import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from '../LandAbi.json';
import "./OwnerLogin.css"

const OwnerLogin = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [city, setCity] = useState('');
  const [inspectorDetails, setInspectorDetails] = useState(null);

  const web3 = new Web3(window.ethereum);

  const contractAddress = '0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B'; // Replace with your contract address
  const ownerAddress = '0x14093F94E3D9E59D1519A9ca6aA207f88005918c'; // Replace with the owner's address

  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // useEffect(() => {
  //   async function loadInspectorDetails() {
  //     const accounts = await web3.eth.getAccounts();

  //     if (accounts.length === 0) {
  //       console.error('No accounts available. Please check your MetaMask or Web3 setup.');
  //       return;
  //     }

  //     if (accounts[0] !== ownerAddress) {
  //       console.error('You do not have permission to access this page.');
  //       return;
  //     }

  //     try {
  //       const details = await contract.methods.InspectorMapping(accounts[0]).call();
  //       setInspectorDetails(details);
  //     } catch (error) {
  //       console.error('Error loading Land Inspector details:', error);
  //     }
  //   }

  //   loadInspectorDetails();
  // }, [web3.eth, ownerAddress]);

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
    <div className='container3'>
      <h2>Add Land Inspector</h2>
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
      <button className='submit-button' onClick={addLandInspector}>Add Land Inspector</button>
      {inspectorDetails && (
        <div>
          <h2>Land Inspector Details</h2>
          <p>Name: {inspectorDetails.name}</p>
          <p>Age: {inspectorDetails.age}</p>
          <p>Designation: {inspectorDetails.designation}</p>
          <p>City: {inspectorDetails.city}</p>
          {/* Render other details as needed */}
        </div>
      )}
    </div>
  );
};

export default OwnerLogin;
