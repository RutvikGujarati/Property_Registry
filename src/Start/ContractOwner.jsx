import React, { useState } from 'react';
import Web3 from 'web3';
import contractAbi from '../Components/LandAbi.json';
import "../styles/owner.css"

const ContractOwner = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [city, setCity] = useState('');

  const customProviderUrl = 'https://polygon-mumbai.g.alchemy.com/v2/sqUHOaFt1ob_60MInF0pn1p7iajAoBSN'; // Replace with your provider URL


  // const web3 = new Web3(new Web3.providers.HttpProvider(customProviderUrl));

  const web3 = new Web3(window.ethereum);



  const contractAddress = '0x31765C3183a1371E6F4D6542B573C1a24bCD3e9B'; // Replace with your contract address
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const handleAddLandInspector = async () => {
    // Ensure the contract owner is making this request
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.error('No accounts available. Please check your MetaMask or Web3 setup.');
      return;
    }
    const contractOwner = accounts[0]; // The first account is assumed to be the contract owner

    try {
      const result = await contract.methods
        .addLandInspector(accounts[1], name, age, designation, city)
        .send({
          from: contractOwner,
        });

      console.log('Land Inspector added successfully:', result);
    } catch (error) {
      console.error('Error adding Land Inspector:', error);
    }
  };

  return (
    <div className='container3'>
      <h2>Add Land Inspector</h2>
      <div className='input-container2'>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>Designation:</label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
      </div>
      <div className='input-container2'>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <button className='submit-button' onClick={handleAddLandInspector}>Add Land Inspector</button>
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

export default ContractOwner;



//ContractOwner