import './App.css';
import {useState,useEffect} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UploadImage from './UploadImage.js';
import Navbar from './Navbar.js';
import UploadSuccess from './UploadSuccess.js';
function App(){
  const [walletAddress,setWalletAddress]=useState("");
    useEffect(()=>{
    // getWalletAddress();
    addWalletListener();
        });
        function addWalletListener(){
          if(window.ethereum){
            window.ethereum.on("accountsChanged",(accounts)=>{
              if(accounts.length>0){
                setWalletAddress(accounts[0]);
              }else{
                setWalletAddress("")
              }
            });
    
          }else{
            alert("Please install metaMask");
          }
        }
  async function getWalletAddress(){
    if(window.ethereum){
        const accounts=await window.ethereum.request({method:'eth_requestAccounts'});
        const account=accounts[0];
        setWalletAddress(account);

    }else{
        alert("Please install MetaMask");
    }
}
    return(
        <div id="container">
         <Router>
          <Navbar onConnectWallet={getWalletAddress} walletAddress={walletAddress}/>
          <Routes>
            <Route path="/" exact element={<UploadImage address={walletAddress}/>}/>
            <Route path="/success" element={<UploadSuccess/>}/>
          </Routes>
        
         </Router>
        </div>
    );
}
export default App;