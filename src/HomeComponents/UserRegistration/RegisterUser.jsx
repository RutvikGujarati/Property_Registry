import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractAbi from "../../Components/LandAbi.json";
import IpfsApi from "ipfs-mini";
import axios from "axios";
import "./registeruser.css";
import { Web3Button } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [User, setUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [addContract, setAddContract] = useState()
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [document, setDocument] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const storedData = localStorage.getItem("uploadedFiles");
    return storedData ? JSON.parse(storedData) : [];
  });

  const Navigate = useNavigate();

  // Regular expressions for input validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const ageRegex = /^[0-9]{2}$/;
  const aadharNumberRegex = /^[0-9]{11}$/;
  const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  function resetForm() {
    setName("");
    setAge("");
    setCity("");
    setAadharNumber("");
    setPanNumber("");
    setDocument("");
    setEmail("");
  }

  const contractAddress = "0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B"; // Replace with your contract address

  const fetchUserList = async () => {
    setIsLoading(true);

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Assuming your contract has a function named "ReturnAllUserList" to fetch user details
      const userAddresses = await contract.methods.ReturnAllUserList().call();

      const userDetails = [];

      for (const userAddress of userAddresses) {
        // Call UserMapping to get user details for each address
        const userDetail = await contract.methods.UserMapping(userAddress).call();
        userDetails.push(userDetail);
      }
      
      // "result" should contain an array of user details
      setUserList(userDetails);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user list:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && !name.match(nameRegex) && (
            <p className="error-message">
              Name should contain alphabet characters only.
            </p>
          )}
        </div>

        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {age && !age.match(ageRegex) && (
            <p className="error-message">
              Age should contain numbers only Or Two decimals .
            </p>
          )}
        </div>

        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="AadharNumber"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
          />
          {aadharNumber && !aadharNumber.match(aadharNumberRegex) && (
            <p className="error-message">
              Aadhar number should be exactly 11 digits long.
            </p>
          )}
        </div>

        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="PanNumber"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
          {panNumber && !panNumber.match(panNumberRegex) && (
            <p className="error-message">
              Please enter a valid PAN number (e.g., ABCDE1234F).
            </p>
          )}
        </div>

        <div className="input-container">
          <input
            className="input-box"
            type="file"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            onClick={handleFileUpload}
          />
        </div>

        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && !email.match(emailRegex) && (
            <p className="error-message">
              Please enter a valid Email (e.g., ABCDE7348@gmail.com).
            </p>
          )}
        </div>

        {/* <button className="submit-button" onClick={handleRegistration}>Submit</button> */}
        <Web3Button
        contractAddress="0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B"
        contractAbi={contractAbi}
        action={(contract)=> contract.call(
          "registerUser",
          [
            name,
            age,
            city,
            aadharNumber,
            panNumber,
            document,
            email
          ]
        )}

        onSuccess={()=>{
          resetForm();
          // setAddContact(false);
          Navigate("/userLogin");
        }}

        >Register User</Web3Button>
      </div>
      {/* </div> */}
      <div>
        <Web3Button
        contractAddress="0xe8Ae8d8cDc88BD818a1065a15966Bcc0F407dD2B"
        contractAbi={contractAbi} 
        action={fetchUserList}
        
        //ReturnAllUserList
        >Fetch users</Web3Button>
         {isLoading ? (
        <p>Loading user list...</p>
      ) : (
        <ul>
          {userList.map((user, index) => (
            <li key={index}>
              <strong>Name: </strong>{user.name}
              <br />
             <strong>Age: </strong>{user.age}
             <br />
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
    </>
  );
};

export default RegisterUser;



// const contractAddress = "0xf7E9f7309146Dcd6201A1a86b48499022b229a19";
//   const contract = new web3.eth.Contract(contractAbi, contractAddress);

//   const apiKey = 'e9417699d08e7376e68f';
//   const apiSecretKey = '238e6574edcad9dfdcbfa0f0bc3dffd7f3bf764f533a6fe737d0852266bb2f58';

// //  const ipfs = new IpfsApi({ host: 'ipfs.pinata.cloud', port: 443, protocol: 'https' });

//   const uploadDocumentToIpfs = async (document) => {
//     const formData = new FormData();
//     formData.append('file', document);

//     try {
//       const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'pinata_api_key': apiKey,
//           'pinata_secret_api_key': apiSecretKey,
//         },
//       });

//       const ipfsCid = response.data.IpfsHash;
//       return ipfsCid;
//     } catch (error) {
//       console.error('Error uploading to IPFS:', error);
//     }
//   };

//   const registerUser = async () => {
//     const accounts = await web3.eth.getAccounts();

//     try {
//       const documentHash = await uploadDocumentToIpfs(selectedFile);

//       await contract.methods
//         .registerUser(name, age, city, aadharNumber, panNumber, documentHash, email)
//         .send({
//           from: accounts[0],
//         });

//       // Registration successful, you can redirect to the next page.
//     } catch (error) {
//       console.error('Registration error:', error);
//     }
//   };

//   const handleRegistration = () => {
//     registerUser();
//   };