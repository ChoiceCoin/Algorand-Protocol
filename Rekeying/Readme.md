# Jinx REKEYING BASH 

 This is accomplished by issuing a "rekey-to transaction" which sets the authorized address field within the account object. Future transaction authorization using the account's public address must be provided by the spending key(s) associated with the authorized address which may be a single key address, MultiSig address or LogicSig program address. Key management is an important concept to understand and Algorand provides tools to accomplish relevant tasks securely.

# Why rekeying
- Don't have to frequently change account because u aren't sure of your mnemonic
- It ideal for Business, Fundraising/Donation with just wallet one address
- A fast and seamless way to preserve account permanence
- Secure existing accounts with a new Private Spending Key at anytime, including with a hardware wallet,a multi-sig account, or smart contract based key
- Novation with the ability to reassign ownership of a contract

## Technologies and Platform used

- Js
- Algorand

---
###  🚀 Quick Guide
```sh
- clone my repo
# cd into the repo dir
-$ npm install
# to run in terminal
-$ node rekey.js


```

## Functionalities

-  User can add Api key
-  Usermust havean existing wallet address and mnemonics

###  🚀 Quick Start
- Input the wallet address and mnemonic necessary for the wallet wanting to be rekeyed

```javascript
// to rekey the wallet using a newly generated account.
 rekeytosingle(wallet, mnemonic,wallet_obj);

 // returns the new keys and mnemonics of the account

//To rekey the wallet with a newly generated multis account ==>
function rekeytomultisig(wallet, mnemonic,no_of_accounts) ;

// the returned key then sign transactions
// This function rekeys one from the specified wallets in the array
function rekeytomultisig(main_address,main_mnemonic,0,[
    {
      addr: '',
      sk:''},
    {
      addr: '',
      sk:''
    },
    {
      addr: '',
      sk:'',}
   
  ]
  )

//function to see effect of rekeying (notice in auth address property)
async function check(address){
    let account=await algoClient.accountInformation(address).do()
    console.log(account)
}
 // hence the auth address field is updated

```

---

## Rekeying
To rekey an account to a new address, simply call the `addRekey` function on any transaction.

```javascript
//...
let txn = algosdk.makePaymentTxnWithSuggestedParams(
  from,
  to,
  amount,
  closeRemainderTo,
  note,
  suggestedParams
);
// From now, every transaction needs to be sign the SK of the following address
txn.addRekey(keys.sk);
//...
```

> - When submitting a transaction from an account that was rekeying, simply use relevant SK. `algosdk.signTransaction`/`transaction.signTxn` will detect
that the SK corresponding address is different than the sender's and will set the `AuthAddr` accordingly.
> - Alternatively, you can use `kmdclient.signTransactionWithSpecificPublicKey`.

## Transaction of dispensed algo in Goalseeker

[txid3](https://testnet.algoexplorer.io/tx/WDTMEMMT6PY3QD5BDWHBI4RVEKL4FA6MEKD75XG3L7WAPWBBVFQQ)

[rekeyId3](https://testnet.algoexplorer.io/tx/4QIOSG475R746O5VANF67XWR2SWMS2V2WWPMJZSVNJJAZH4U4LKQ)

# Reference
## Js-algorand-sdk

[![Build Status](https://travis-ci.com/algorand/js-algorand-sdk.svg?branch=master)](https://travis-ci.com/algorand/js-algorand-sdk) [![npm version](https://badge.fury.io/js/algosdk.svg)](https://badge.fury.io/js/algosdk)

AlgoSDK is a javascript library for communicating with the Algorand network for modern browsers and node.js.
