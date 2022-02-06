##  Salewa Rekeying Task
---

## Description
One of the unique stuff about Algorand is the ability to rekey your public Algorand addresses! This means you can have your own name at the start of a new public Algorand address and secure it to an existing or new private key you generated securely!

### Technologies Used

- node
- express
- Algosdk  
- dotenv

---

## Functionality
- Generating New Account
- Rekeying an Existing Account with a New Account
- Rekeying an Existing Account with a New Account
- Rekeying an Existing Account with Multisig Account

##  How to Start

You can Clone or fork ` this repo ` :

```sh
git clone < repo >
cd into your working dir

#   Run the npm install to install all modules
npm install

#   or Install all this dependencies: when start from scratch 
npm install algosdk express dotenv

```
✏ Change  the `.env.example` to `.env` in the root dir and provide your `SERVER`,`PORT ` and `TOKEN` from Purestake ([How to get Purestake Server](https://purestake.io)) 
Example:
```jsx
// API server address, port and API token, which you can get from purestake.io
SERVER = ''
PORT = ''
ACCOUNT =       // paste your prefered account address
MNEMONIC =      // add your account mnemonic

```

## 🚴‍♂️ Run your App:
```sh
npm start
```
###  🚀 Quick Guide
- Input the wallet address and mnemonic necessary for the wallet wanting to be rekeyed

```javascript
// to rekey the wallet using a newly generated account.
 rekeytosingle(wallet, mnemonic,wallet_obj);

 // returns the new keys and mnemonics of the account
```

```javascript
//To rekey the wallet with a newly generated multis account ==>
function rekeytomultisig(wallet, mnemonic,no_of_accounts) ;

// the returned key then sign transactions
```

```javascript
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
