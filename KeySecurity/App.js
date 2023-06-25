// Imports
import './App.css';
import algosdk from "algosdk";
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { useEffect } from 'react';


// deflywallet instantiating
const deflywallet = new DeflyWalletConnect()

// algoClient
const algod_address = "https://mainnet-api.algonode.cloud"
const algod_token = ""
const headers = {"X-Algo-API-Token": algod_token }
const algodClient = new algosdk.Algodv2(algod_token, algod_address, headers);

//get address
const address = localStorage.getItem('address');

// prize address
const prizeAddress = ''

/////////////////////////
/////////////////////////
// THIS IS THE VARIABLE THAT NEEDS PROTECTED.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!
/////////////////////////
/////////////////////////
const private_key = ''
/////////////////////////
/////////////////////////
/////////////////////////

//asset id
const ASSET_ID = 297995609;

/// transaction code
const transaction = async () => {
  try{
    const suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: prizeAddress,
      amount: 200,
      assetIndex: ASSET_ID,
      suggestedParams,
    });
    const optInTxn = [{txn : txn, signers: [address]}]
    const signedTxn = await deflywallet.signTransaction([optInTxn])
    const success = await algodClient.sendRawTransaction(signedTxn).do();
    return success
  }
  catch(err){
    console.log(err)
    return false
  }
  }
  
// Wallet Connect
async function walletConnect() {
  const newAccounts= await deflywallet.connect()
  localStorage.setItem("address", newAccounts[0]);
  window.location.reload()
  console.log('Connect')
  }

// wallet disconnect
const disconnect = () => {
  deflywallet.disconnect()
  localStorage.removeItem("address");
  window.location.reload()
  }

/////////////////////////
/////////////////////////
// Transaction from wallet to user upon conditional logic.
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////

const smallestprizetransaction = async () => {
  /////////////////////////
  /////////////////////////
  // Secure variable call for private key.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!
  /////////////////////////
  const mnemonic = private_key;
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  const recoveblueAccount = algosdk.mnemonicToSecretKey(mnemonic); 
  const suggestedParams = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: prizeAddress,
    to: address,
    amount: 200,
    assetIndex: ASSET_ID,
    suggestedParams,
  });
  // Sign the transaction
  const signedTxn = txn.signTxn(recoveblueAccount.sk);
  const sendTx = algodClient.sendRawTransaction(signedTxn).do();
  const txId = txn.txID().toString();
  console.log("Transaction sent with ID " + sendTx.txId);
  console.log("Signed transaction with txID: %s", txId);
  // Wait for confirmation
  algosdk.waitForConfirmation(algodClient, txId, 4);
  }


/////////////////////////
/////////////////////////
// Conditional logic triggering transaction.
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
const guess = async () => {
  const transactionSuccess = await transaction()
  if (transactionSuccess){
    ////////////////////

    const generateNumberOne = Math.floor(Math.random() * 3)
    const generateNumberTwo = Math.floor(Math.random() * 3)
    const generateNumberThree = Math.floor(Math.random() * 3)

    document.getElementById('message1').textContent =  generateNumberOne 
    document.getElementById('message2').textContent =  generateNumberTwo 
    document.getElementById('message3').textContent =  generateNumberThree
    
    // Convert to Int
    const generateNumberOneInt = parseInt(generateNumberOne);
    const generateNumberTwoInt = parseInt(generateNumberTwo);
    const generateNumberThreeInt = parseInt(generateNumberThree);
    console.log(generateNumberOneInt)
    console.log(generateNumberTwoInt)
    console.log(generateNumberThreeInt)

    /////////////////////////
    /////////////////////////
    // Function call on conditional happening.
    /////////////////////////
    /////////////////////////
    /////////////////////////
    /////////////////////////
    /////////////////////////
    if(generateNumberOneInt===2){
      document.getElementById('message4').textContent = 'Win 2k Choice!'
      smallestprizetransaction();
    } else if(generateNumberTwoInt===2){
      document.getElementById('message4').textContent = 'Win 2k Choice'
      smallestprizetransaction();
    } else if(generateNumberThreeInt===2){
      document.getElementById('message4').textContent = 'Win 2k Choice!'
      smallestprizetransaction();
    } 
  };
}

/////////////////////////
/////////////////////////
// React App
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
function App() {
  useEffect(() => {
    deflywallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        localStorage.setItem("address", accounts[0]);
      }
      deflywallet.connector?.on("disconnect", () => {
        localStorage.removeItem("address");
      });
    })
    .catch((e) => console.log(e));
  }, [])
  return (
    <div className="App">
      <header className="App-header">

        <h1>
          <div id = "displaytext" style={{ color: "blue" }}> Private Key Storage Example </div>
        </h1>

        <p>
        <p>
          <button id='button1' onClick={walletConnect}> Connect</button>
          <button id='button2' onClick={disconnect}> Disconnect</button>
        </p>
        </p>


        <table>
          <tr>
            <td id='message1'></td>
            <td id='message2'></td>
            <td id='message3'></td>
          </tr>
        </table>
        <div id='message4'></div>
        <div>
          <button id='button3' onClick={guess}>Button</button>
        </div>


      </header>
    </div>
  );

}
export default App;


