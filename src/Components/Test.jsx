import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from './LandAbi.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [city, setCity] = useState('');
  // Add more state variables for other user details

  // Initialize Web3 and the contract
  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = contractAbi.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          contractAbi.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);
      }
    }
    initWeb3();
  }, []);

  const handleRegistration = async () => {
    try {
      if (contract && name && age > 0 && city) {
        const accounts = await web3.eth.getAccounts();
        await contract.methods
          .registerUser(name, age, city, /* Add more parameters here */)
          .send({ from: accounts[0] });

        // Registration successful
      } else {
        // Handle validation errors
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const fetchAllUsers = async () => {
    if (contract) {
      const users = await contract.methods.ReturnAllUserList().call();
      console.log('All Users:', users);
    }
  };

  const verifyUser = async (userId) => {
    if (contract) {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.verifyUser(userId).send({ from: accounts[0] });
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        {/* Add more input fields for other user details */}
        <button onClick={handleRegistration}>Register</button>
      </div>
      <div>
        <button onClick={fetchAllUsers}>Fetch All Users</button>
        {/* Display user details here */}
      </div>
    </div>
  );
};

export default App;
