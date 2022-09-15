/// Exodus Wallet Connect
/// Buttons for React Apps

// Imports
import * as React from "react";
import algosdk from "algosdk";
import './App.css';

// algoClient

const TOKEN = "";
const SERVER = "https://node.algoexplorerapi.io/";
const PORT = 443;
const algodClient = new algosdk.Algodv2(TOKEN, SERVER, PORT);
// const suggestedParams = await algodClient.getTransactionParams().do()

// //get address
// const address = localStorage.getItem('address');

/// Exodus
//////////////
////Exodus Connect
const exoConnect = async () => {
  interface ConnectInfo {
    address: string;
  }
  window.exodus.algorand.on("connect", (data: ConnectInfo) => {
    console.log(data);
  });
  try {
    const resp = await window.exodus.algorand.connect();
    console.log(resp);
    return resp.address;
  } catch (err) {}
};

////Exodus disConnect
const exoDisConnect = () => {
  window?.exodus.algorand.disconnect();
};

/// Exodus Transaction
async function exoTransaction() {
  const suggestedParams = await algodClient.getTransactionParams().do();
  const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams,
    from: window.exodus.algorand.address,
    //to: window.exodus.algorand.address,
    to: '',
    amount: 10000
  });
  const signedTransactions = await window.exodus.algorand.signTransaction([
    transaction.toByte()
  ]);
  console.log({ signedTransactions });
  return signedTransactions;
}

// React App
function App() {
  const [address, setAddress] = React.useState("");
  const [signature, setSignature] = React.useState("");
  const connectHandler = async () => {
    const address = await exoConnect();
    if (address) {
      setAddress(address);
    }
  };
  const transactionHandler = async () => {
    const txSignatureInBytes = await exoTransaction();
    const preparedSig =
      "signTransaction signedTransactions: " +
      JSON.stringify(txSignatureInBytes);
    setSignature(preparedSig);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <div id="displaytext" style={{ color: "blue" }}>
            {" "}
            Exodus Wallet{" "}
          </div>
        </h1>
        <p>
          <div>
            <div id="displaytext" style={{ color: "blue" }}>
              {" "}
              Choice Coin Connect{" "}
            </div>
          </div>
          <button id="button1" onClick={connectHandler}>
            {" "}
            Connect
          </button>
          <button id="button2" onClick={exoDisConnect}>
            {" "}
            Disconnect
          </button>
        </p>
        <p>
          <button id="button3" onClick={transactionHandler}>
            {" "}
            Transaction
          </button>
        </p>
        <div>
          <div
            id="displaytext"
            style={{
              color: "blue",
              maxWidth: "800px",
              margin: "0 auto",
              wordBreak: "break-word"
            }}
          >
          </div>
        </div>
      </header>
    </div>
  );
}
export default App;