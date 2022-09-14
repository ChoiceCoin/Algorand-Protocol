/// Exodus Wallet Connect
/// Buttons for React Apps

// Imports
import './App.css';
import algosdk from "algosdk";

// algoClient
const algod_token = {
  "X-API-Key": "" 
}
const algod_address = "https://testnet-algorand.api.purestake.io/ps2";
const headers = "";
const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);
const suggestedParams = await algodClient.getTransactionParams().do()

//get address
const address = localStorage.getItem('address');

/// Exodus
//////////////
////Exodus Connect
const exoConnect = () =>{
  interface ConnectInfo {
    address: string
  };
  algorand.on('connect', handler: (connectInfo: ConnectInfo) => void)
  try {
  const resp = await window.exodus.algorand.connect()
  resp.address
}

////Exodus disConnect
const exoDisConnect = () => {
  algorand.disconnect(): void
  window.exodus.algorand.disconnect()
}

/// Exodus Transaction
async function exoTransaction() {
  const suggestedParams = await algodClient.getTransactionParams().do()
  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams,
    from: window.exodus.algorand.address,
    to: '',
    amount: 10000,
  })
  const signedTransactions = await window.exodus.algorand.signTransaction([
    transaction.toByte(),
  ])
}

// React App
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <div id = "displaytext" style={{ color: "blue" }}> Choice Coin Inferno </div>
        </h1>
        <p>
        <div>
          <div id = "displaytext" style={{ color: "blue" }}> Exodus Wallet </div>
        </div>
          <button id='button1' onClick={exoConnect}> Connect</button>
          <button id='button2' onClick={exoDisConnect}> Disconnect</button>
        </p>
        <p>
          <button id='button3' onClick={exoTransaction}> Transaction</button>
        </p>
      </header>
    </div>
  );

}
export default App

////////////////////////////////////////////////////////////////////////////
//// Error report
/// ./src/App.js SyntaxError: 
/// App.js: The type cast expression is expected to be wrapped with parenthesis. (24:32)
/// Line 24: algorand.on('connect', handler: (connectInfo: ConnectInfo) => void)
