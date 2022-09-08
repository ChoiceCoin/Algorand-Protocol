// Imports
import './App.css';
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";
import { useEffect } from 'react';

// perawallet instantiating
const perawallet = new PeraWalletConnect()

// algoClient
const algod_token = {
  "X-API-Key": "" 
}
const algod_address = "";
const headers = "";
const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);

//get address
const address = localStorage.getItem('address');

// converter address
const converterAddress = ''

//asset id
const ASSET_ID = '';

/// transaction code
const  transaction = async () => {
  const suggestedParams = await algodClient.getTransactionParams().do();
  const ethAddress = document.getElementById('reciever').value
  const enc = new TextEncoder();
  const note = enc.encode('Transaction with perawallet:'+ ethAddress);
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: address,
    to: converterAddress,
    amount: 1,
    assetIndex: ASSET_ID,
    note : note,
    suggestedParams,
  });
  const optInTxn = [{txn : txn, signers: [address]}]
  const signedTxn = await perawallet.signTransaction([optInTxn])
    await algodClient.sendRawTransaction(signedTxn).do();
  console.log('error')
}

// Wallet Connect
async function walletConnect() {
  const newAccounts= await perawallet.connect()
  localStorage.setItem("address", newAccounts[0]);
  window.location.reload()
  console.log('Connect')
  }

// wallet disconnect
const disconnect = () => {
  perawallet.disconnect()
  localStorage.removeItem("address");
  window.location.reload()
}

// React functions must return a React component
function App() {
  useEffect(() => {
    perawallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        localStorage.setItem("address", accounts[0]);
      }
      perawallet.connector?.on("disconnect", () => {
        localStorage.removeItem("address");
      });
    })
    .catch((e) => console.log(e));
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Choice Coin Connect
        </h1>
        <div>
          <button id='button1' onClick={walletConnect}> Connect</button>
        </div>
        <p></p>
        <div>
          <button id='button1' onClick={transaction}> Send</button>
        </div>
        <p></p>
        <div>
          <button id='button1' onClick={disconnect}> Disconnect</button>
        </div>
      </header>
    </div>
  );
}

export default App;
