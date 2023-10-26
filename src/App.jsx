import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import Front from "./HomeComponents/Home/Front";
import User from "./HomeComponents/User/User";
// import Window from "./HomeComponents/Window";
import LandInspector from "./HomeComponents/LandInspector/LandInspector"
import OwnerLogin from "./Components/OwnerLogin/OwnerLogin"
import LoginUser from "./HomeComponents/UserRegistration/RegisterUser"
import { BrowserRouter, Route, Routes } from "react-router-dom/dist";
import Owner from "./HomeComponents/Owner/Owner"
import About from "./HomeComponents/About/About"
// import Test from "./Components/test";

export default function Home() {
  return (
    
   <BrowserRouter>
  

   <Routes>
    <Route path="/User" element={<User />}/>
    <Route path="/owner" element={<Owner />}/>
    <Route path="/" element={<Front />}/>
    {/* <Route path="/Home" element={<Window />} /> */}
    <Route path="/contractOwner" element={<OwnerLogin />} />
    <Route path="/about" element={<About />} />

    {/* <Route path="/Test" element={<Test />} /> */}

    <Route path="/loginUser" element ={<LoginUser />}/>
    <Route path="/land-inspector" element={<LandInspector />}/>
    {/* <Route path="/contract-owner" element={<ContractOwner />}/> */}
   </Routes>
   </BrowserRouter>
    );
}
