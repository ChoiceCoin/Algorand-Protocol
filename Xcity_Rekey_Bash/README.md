# XCITY REKEYING BASH SUBMISSION

Rekeying is a powerful protocol feature which enables an Algorand account holder to maintain a static public address while dynamically rotating the authoritative private spending key(s). This is accomplished by issuing a "rekey-to transaction" which sets the authorized address field within the account object. Future transaction authorization using the account's public address must be provided by the spending key(s) associated with the authorized address which may be a single key address, MultiSig address or LogicSig program address. Key management is an important concept to understand and Algorand provides tools to accomplish relevant tasks securely.

# Key Benefits of REKEYING

- A fast and seamless way to preserve account permanence
- Secure existing accounts with a new Private Spending Key at anytime, including with a hardware wallet,a multi-sig account, or smart contract based key
- Novation with the ability to reassign ownership of a contract

# Js-algorand-sdk

[![Build Status](https://travis-ci.com/algorand/js-algorand-sdk.svg?branch=master)](https://travis-ci.com/algorand/js-algorand-sdk) [![npm version](https://badge.fury.io/js/algosdk.svg)](https://badge.fury.io/js/algosdk)

AlgoSDK is a javascript library for communicating with the Algorand network for modern browsers and node.js.

## STEPS TO RUN

- clone my repository

- "npm install" to install dependencies

- 'node rekey.js' to run in terminal

- to make use of multisig with existing wallet run the `multisigExistingAct()` function

- to make use of multisig with generated wallet run the `multiSig()` function

- to make use of singleRekeying with generated wallet run the `rekeySingle()` function

## Quick Start

```javascript
const token = "Your algod API token";
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const client = new algosdk.Algod(token, server, port);

(async () => {
  console.log(await client.status());
})().catch((e) => {
  console.log(e);
});
```

## Youtube Video

[youtube](https://youtu.be/PqMdBzv5uIM)

## Functionalities

- [x] User has to add his/her Api key
- [x] User has to add already created wallet address and phrase
- [x] Leave the rest for the PC

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

When submitting a transaction from an account that was rekeying, simply use relevant SK. `algosdk.signTransaction`/`transaction.signTxn` will detect
that the SK corresponding address is different than the sender's and will set the `AuthAddr` accordingly. Alternatively, you can use `kmdclient.signTransactionWithSpecificPublicKey`.

## Technologies and Platform used

- Js
- Algorand

## Transaction of dispensed algo in Algoexplorer

[txid1](https://testnet.algoexplorer.io/tx/O2RCUYOBWFAICD6SCSKV7YVOAXBOBUF4WM6DQL2RW34NI7Q4JH6A)
[txid2](https://testnet.algoexplorer.io/tx/G3UGOYTWFHWXXFEWGGZBZUNMOOT4OGWFA2MS5VLKAXGN3KPIYPZA)
[txid3](https://testnet.algoexplorer.io/tx/WDTMEMMT6PY3QD5BDWHBI4RVEKL4FA6MEKD75XG3L7WAPWBBVFQQ)

[rekeyId](https://testnet.algoexplorer.io/tx/RHA2WN55I52GTZMPQJMUKVVIUSB25T5SHU66N42FS2A34AKAL7MA)
[rekerId2](https://testnet.algoexplorer.io/tx/UXHMCDHGI63APZ4HKNDJBY3N4Z2H2DNQ2NMIHDO4CF6I57DMIY3Q)
[rekeyId3](https://testnet.algoexplorer.io/tx/4QIOSG475R746O5VANF67XWR2SWMS2V2WWPMJZSVNJJAZH4U4LKQ)

## Reference

[Reference](https://developer.algorand.org/docs/get-details/accounts/rekey/?from_query=rekeying#create-publication-overlay)
