const algosdk = require('algosdk');
const clc = require("cli-color");
const fs = require('fs');



const ASSET_ID = 21364625;

const host = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
    "x-api-key": "HfiEnjsWGW28EEEdqURGt40hxXT3hVSs6nkGAr9Y"
};
const port = '';
const client = new algosdk.Algodv2(token, host, port);

const mnphrase1 = "novel poverty prefer toward guitar track resemble empower elder vessel pilot provide paper lizard scatter million eagle walnut topic thunder draft buzz amazing above brand";
const mnphrase2 = "believe bless pull resemble steak direct juice slot mango genius arena creek puppy game dilemma stomach virus trip monster brisk syrup resist collect able pumpkin";

console.log(`Please make sure your Mnemonic(private) and Account(public) are saved.`);
console.log("Add funds to account using the TestNet Dispenser: ");
console.log("https://dispenser.testnet.aws.algodev.network/ \n\n");


function pressAnyKey(msg = 'Press any key to continue') {
    return new Promise((resolve) => {
        console.log(msg || 'Press any key to continue');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', () => {
            process.stdin.destroy();
            resolve();
        });
    });
}


// import first account
function importAccount1(){
    const passphrase = mnphrase1;
    let myAccount = algosdk.mnemonicToSecretKey(passphrase);
    return myAccount;
}

// import second account
function importAccount2(){
	const passphrase = mnphrase2;
    let myAccount = algosdk.mnemonicToSecretKey(passphrase);
    return myAccount;
}

function genAccount(){
    try {  
        // const myaccount = "522BKRGZKPSZVFHM6QI3F4LIE2WVCYT7DFFZKSQWEWOBUCXPIURHPAWITU"
        const myaccount = algosdk.generateAccount();
        let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
        console.log(`Bola Account: ${clc.bgBlueBright(myaccount.addr)} \n...\n${account_mnemonic}\n`);
        return myaccount;
    }
    catch (err) {
        console.log("err", err);
    }
}

console.log(`Imported account1: ${clc.bgBlueBright(importAccount1().addr)} \n...\n${mnphrase1} \n \n`);

console.log(`Imported account2: ${clc.bgBlueBright(importAccount2().addr)} \n...\n${mnphrase2} \n \n`);
genAccount();

accountInfo = ()=>{
    const host = "https://testnet-algorand.api.purestake.io/ps2";
    const token = {
        "x-api-key": "HfiEnjsWGW28EEEdqURGt40hxXT3hVSs6nkGAr9Y"
    };
    const port = '';
    const address1 = importAccount1().addr
    const address2 = importAccount2().addr
    const address3 = genAccount().addr;
    const client = new algosdk.Algodv2(token, host, port);
    (async()=>{
        let assets1 = await client.accountInformation(address1).do();
        const algo1 = `Account1: ${clc.green(assets1.amount/1000000)} Algo`
        console.log(algo1)

        let assets2 = await client.accountInformation(address2).do();
        const algo2 = `Account2: ${clc.green(assets2.amount/1000000)} Algo`
        console.log(algo2)

        let assets3 = await client.accountInformation(address3).do();
        const algo3 = `Account3: ${clc.green(assets3.amount/1000000)} Algo`
        console.log(algo3)
        await pressAnyKey()
        transfer();
    })().catch(e =>{
        console.log(e);
    })
}

accountInfo()

// function used to wait for a tx confirmation
const waitForConfirmation = async function (algodclient, txId) {
    let status = (await algodclient.status().do());
    let lastRound = status["last-round"];
      while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
          //Got the completed Transaction
          console.log(clc.bgYellow("Transaction " + clc.bgBlueBright(txId) + " confirmed in round " + pendingInfo["confirmed-round"]));
          console.log(clc.bgGreen(clc.white(`https://testnet.algoexplorer.io/tx/${txId}`)));
          
          break;
        }
        lastRound++;
        await algodclient.statusAfterBlock(lastRound).do();
    };
};

async function transfer(){

    try{
        // receiver Account C
        const receiver = genAccount().addr;
        // sample show account A to C
        // B to A 
        // grouped

        // recover account
        // Account A
        let myAccountA = await importAccount1();
        console.log(clc.yellow("Account1 address: %s"), myAccountA.addr)

        // recover an additional account
        // Account B
        let myAccountB = await importAccount2();
        console.log(clc.yellow("Account2 address: %s"), myAccountB.addr)

        // get suggested params from the network
        let params = await client.getTransactionParams().do()

        // Transaction A to C 
        let transaction1 = algosdk.makePaymentTxnWithSuggestedParams(myAccountA.addr, receiver, 1000000, undefined, undefined, params);  
        // Create transaction B to A
        let transaction2 = algosdk.makePaymentTxnWithSuggestedParams(myAccountB.addr, myAccountA.addr, 1000000, undefined, undefined, params);  

        // Store both transactions
        let txns = [transaction1, transaction2];

        // Group both transactions
        let txgroup = algosdk.assignGroupID(txns);

        // Sign each transaction in the group 
        let signedTx1 = transaction1.signTxn( myAccountA.sk )
        let signedTx2 = transaction2.signTxn( myAccountB.sk )
    
        // Combine the signed transactions
        let signed = []
        signed.push( signedTx1 )
        signed.push( signedTx2 )

        let tx = (await client.sendRawTransaction(signed).do());
        console.log("Transaction : \n" + clc.bgBlueBright(JSON.stringify(tx)));

        // Wait for transaction to be confirmed
        await waitForConfirmation(client, tx.txId)
    } catch (err) {
        console.log("err", err);  
    }
}
