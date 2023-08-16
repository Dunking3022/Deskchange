import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import Styles from "./style.module.css";
import { ST } from "next/dist/shared/lib/utils";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  
  
  const [IMG, setIMG] = useState(undefined);

  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      setIMG("https://media1.giphy.com/media/XHpeJ93ssEvxmxjoGV/giphy.gif?cid=6c09b952y20oxyvk5mudthigz5fq2l8viygqwxp9gwss0be8&ep=v1_stickers_related&rid=giphy.gif&ct=s");

    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
      
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      
      setIMG("https://media.tenor.com/FeNdRyY9m3sAAAAC/honey-paypal-honey.gif");
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async(event) => {
    if (atm) {
      // setValue(event.target.depositINP.value);
      let transactionValue = parseInt(document.getElementById("depositINP").value);
      alert("Depositing "+transactionValue+" tokens");
      let tx = await atm.deposit(transactionValue);


      await tx.wait()
      setIMG("https://media3.giphy.com/media/Q8gR3fgWesYqlx9f0U/200w.gif?cid=82a1493b3mqfg2qvouc74a590kt7c2zrqf0923atq5w05r6p&ep=v1_gifs_related&rid=200w.gif&ct=s");
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      
      let transactionValue = (parseInt(document.getElementById("withdrawINP").value));
      alert("Withdrawing "+transactionValue+" tokens");
      let tx = await atm.withdraw(transactionValue);
      await tx.wait()
      setIMG("https://media3.giphy.com/media/Q8gR3fgWesYqlx9f0U/200w.gif?cid=82a1493b3mqfg2qvouc74a590kt7c2zrqf0923atq5w05r6p&ep=v1_gifs_related&rid=200w.gif&ct=s");
      getBalance();
    }
  }

  const flusher = async() => {
    if (atm) {
      alert("You will lose all your tokens!");
      let tx = await atm.withdraw(balance);
      await tx.wait()
      setIMG("https://media3.giphy.com/media/Q8gR3fgWesYqlx9f0U/200w.gif?cid=82a1493b3mqfg2qvouc74a590kt7c2zrqf0923atq5w05r6p&ep=v1_gifs_related&rid=200w.gif&ct=s");
      getBalance();
    }
  }

  const initUser = () => {
    

    
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return(
        <div>
      <button className = {Styles.bc} onClick={connectAccount}>Please connect your Metamask wallet</button>
      </div>
      
      
      )
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <style jsx>{`
        *{
          font-family: Rubik;
        }
        .container {
          text-align: center
        }
        div.bc {
          text-align:center;
          align-items:center;
          align-content:center;
          background-color:pink
        }
        input{
          margin:2px;
        }
        button{
          
          font-family: Rubik;

        }
        
        
        `}
        </style>
        <p><b>Your Account:</b> {account}</p>
        <p><b>Your Balance:</b> <button disabled className={Styles.disp}>{balance}</button></p>
        <div>
          <input type = "text" id = "depositINP" name = "depositINP" className={Styles.inp} placeholder="Enter Amount"></input>
          <button onClick={deposit} className ={Styles.bc} >Deposit   </button>
        </div>
        <div >
          <input id = "withdrawINP" className={Styles.inp} placeholder="Enter Amount"></input>
          <button onClick={withdraw} className ={Styles.bc}>Withdraw</button>
        </div>
        <div className={Styles.flusher}>
          <button onClick={flusher} className ={Styles.flusher}>Flush</button>
        </div>
        

      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    
    <main className="container">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik"></link>
      <header><h1>Deskchange</h1></header>
      <img className = {Styles.logo} src = {IMG}></img>
      
      {initUser()}
      <style jsx>{`
        *{
          font-family: Rubik;
        }
        .container {
          text-align: center;
        }
        
        h1{
          font-size:50px;
        }
        .buttoncontainer {
          font-family: Rubik;
          align-items: center;
          width: 300px;
        }
      `}
      </style>
    </main>
  )
}
