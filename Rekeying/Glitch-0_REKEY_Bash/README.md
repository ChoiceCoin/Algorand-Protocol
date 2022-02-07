##  REKEYING ON ALGORAND USING NEW ACCOUNT
---

## Description
One of the unique stuff about Algorand is the ability to rekey your public Algorand addresses! This means you can have your own name at the start of a new public Algorand address and secure it to an existing or new private key you generated securely!

#### Technologies Used

- python
- Algosdk  

---

## Functionality
- Rekeying an Existing Account with a New Acount


##  Quick Start
It is assumed you already have a working Python environment configured. Next we need to make sure py-algorand-sdk is installed. 

📄 Clone or fork ` this repo ` :
```sh
git clone < repo >

#  Install all dependencies: 

cd into your working dir
pip install py-algorand-sdk
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Purestake ([How to get Purestake Server](https://purestake.io)) 
Example:
```jsx
// API server address, port and API token, which you can get from purestake.io
SERVER = ''
PORT = ''
ACCOUNT =       // paste your prefered account address
MNEMONIC =      // add your account mnemonic

```

---
