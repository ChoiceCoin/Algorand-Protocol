const algosdk = require('algosdk');

const waitForConfirmation = async function (algodclient, txId, timeout) {
    
    if (algodclient == null || txId == null || timeout < 0) {
        throw "Bad arguments.";
    }
    let status = (await algodclient.status().do());
    if (status == undefined) throw new Error("Unable to get node status");
    let startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < (startround + timeout)) {
        let pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
        if (pendingInfo != undefined) {
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                return pendingInfo;
            }
            else {
                if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                    // If there was a pool error, then the transaction has been rejected!
                    throw new Error("Transaction Rejected" + " pool error" + pendingInfo["pool-error"]);
                }
            }
        }
        await algodclient.statusAfterBlock(currentround).do();
        currentround++;
    }
    throw new Error("Transaction not confirmed after " + timeout + " rounds!");
};

const token = {
    "X-API-Key": ""
}
const server = "h";
const port = "";

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
        process.stdin.setRawMode(false)
        resolve()
    }))
}

(async () => {
  
    let account1_mnemonic = "minute hawk cruise mother hub labor health have random grit run since ostrich armed space double piano shove spawn lens slim urge traffic above crater";
    let account2_mnemonic = "name spin gasp cheese entry rotate matter way mosquito heavy tumble piece bike miss mercy any level level urban coyote mom stumble addict abstract fitness";
    let account3_mnemonic = "lunch slush exclude adjust burden win ramp retire ladder ladder distance delay keen midnight please term predict where hawk stick obey cycle cradle absorb biology"

    let account1 = algosdk.mnemonicToSecretKey(account1_mnemonic);
    let account2 = algosdk.mnemonicToSecretKey(account2_mnemonic);
    let account3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
    console.log(account1.addr);
    console.log(account2.addr);
    console.log(account3.addr);

    // Setup the parameters for the multisig account
    const mparams = {
        version: 1,
        threshold: 2,
        addrs: [
            account1.addr,
            account2.addr,
            account3.addr,
        ],
    };

    let multsigaddr = algosdk.multisigAddress(mparams);
    console.log("Multisig Address: " + multsigaddr);
    //Pause execution to allow using the dispenser on testnet to put tokens in account
    console.log('Dispense funds to this account on TestNet https://bank.testnet.algorand.network/');
    // await keypress();
    try {
        let algodclient = new algosdk.Algodv2(token, server, port);

        // Get the relevant params from the algod
        let params = await algodclient.getTransactionParams().do();
        // comment out the next two lines to use suggested fee
        //params.fee = 1000;
        //params.flatFee = true;

        const receiver = account3.addr;
        let names = '{"firstName":"Kixito", "lastName":"Bash"}';
        const enc = new TextEncoder();
        const note = enc.encode(names);


        let txn = algosdk.makePaymentTxnWithSuggestedParams(multsigaddr, receiver, 1000000, undefined, note, params);
        let txId = txn.txID().toString();
        // Sign with first signature

        let rawSignedTxn = algosdk.signMultisigTransaction(txn, mparams, account1.sk).blob;
        //sign with second account
        let twosigs = algosdk.appendSignMultisigTransaction(rawSignedTxn, mparams, account2.sk).blob;
        //submit the transaction
        await algodclient.sendRawTransaction(twosigs).do();

        // Wait for confirmation
        let confirmedTxn = await waitForConfirmation(algodclient, txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
        console.log("Transaction information: %o", mytxinfo);
        let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
        console.log("Note field: ", string);
        const obj = JSON.parse(string);
        console.log("Note first name: %s", obj.firstName);


    } catch (err) {
        console.log(err.message);
    }
})().then(process.exit)
