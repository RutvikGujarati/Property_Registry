import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from '../../Components/LandAbi.json';
import IpfsApi from 'ipfs-mini';
import axios from 'axios';
import image from "../land.jpg"
import logo from "../estd.png"
import "./registeruser.css"

const LoginUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const storedData = localStorage.getItem('uploadedFiles');
    return storedData ? JSON.parse(storedData) : [];
  });

    // Regular expressions for input validation
    const nameRegex = /^[A-Za-z\s]+$/;
    const ageRegex = /^[0-9]{2}$/;
    const aadharNumberRegex = /^[0-9]{11}$/;
    const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const getWeb3 = () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      return web3;
    }
    return null;
  };

  const web3 = getWeb3();

  const contractAddress = '0xf7E9f7309146Dcd6201A1a86b48499022b229a19';
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const apiKey = 'e9417699d08e7376e68f';
  const apiSecretKey = '238e6574edcad9dfdcbfa0f0bc3dffd7f3bf764f533a6fe737d0852266bb2f58';

//  const ipfs = new IpfsApi({ host: 'ipfs.pinata.cloud', port: 443, protocol: 'https' });

  const uploadDocumentToIpfs = async (document) => {
    const formData = new FormData();
    formData.append('file', document);

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': apiKey,
          'pinata_secret_api_key': apiSecretKey,
        },
      });

      const ipfsCid = response.data.IpfsHash;
      return ipfsCid;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  const registerUser = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      const documentHash = await uploadDocumentToIpfs(selectedFile);

      await contract.methods
        .registerUser(name, age, city, aadharNumber, panNumber, documentHash, email)
        .send({
          from: accounts[0],
        });

      // Registration successful, you can redirect to the next page.
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleRegistration = () => {
    registerUser();
  };

  

  return (
    <div className="body">
         <div className="navbar">
          <div className="logo">
              <img src={logo}></img>
          </div>
         </div>

          <div className='back'>
              <img src={image}></img>
          </div>

      <div className="container">
        <div className="input-container">
          <input  className="input-box" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          {name && !name.match(nameRegex) && (
          <p className="error-message">Name should contain alphabet characters only.</p>)}
        </div>

        <div className='input-container'>
           <input  className="input-box" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
         {email && !email.match(emailRegex) && (
          <p className="error-message">Please enter a valid Email  (e.g., ABCDE7348@gmail.com).</p>)}
        </div>

        <div className='input-container'>
          <input className="input-box" type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          {age && !age.match(ageRegex) && (
          <p className="error-message">Age should contain numbers only Or Two decimals  .</p>)}
        </div>

        <div className='input-container'>
          <input className="input-box" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>  

        <div className='input-container'>
          <input className="input-box" type="text" placeholder="AadharNumber" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} />
          {aadharNumber && !aadharNumber.match(aadharNumberRegex) && (
          <p className="error-message">Aadhar number should be exactly 11 digits long.</p>)}
        </div>

        <div className='input-container'>     
          <input className="input-box" type="text" placeholder="PanNumber" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
          {panNumber && !panNumber.match(panNumberRegex) && (
            <p className="error-message">Please enter a valid PAN number (e.g., ABCDE1234F).</p>)}
        </div>

        <div className='input-container'>
          <input className="input-box"  type="file" onChange={handleFileUpload} />
        </div >

        
        
        <button className="submit-button" onClick={handleRegistration}>Submit</button>
      </div>
        {/* </div> */}
    </div>
  );
};

export default LoginUser;
