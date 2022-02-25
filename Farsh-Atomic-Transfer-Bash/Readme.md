# FARSH_ATOMIC TRANSFER SUBMISSION

An Atomic Transfer is an operation that allows multiple transactions which are compiled as one to either succed or fail as a whole.
On Algorand, atomic transfers are implemented as irreducible batch operations, where a group of transactions are submitted as a unit and all transactions in the batch either pass or fail.

Atomic transfers enable use cases such as:
Circular trades - Alice pays Bob if and only if Bob pays Claire if and only if Claire pays Alice.
Group payments - Everyone pays or no one pays.
Decentralized exchanges - Trade one asset for another without going through a centralized exchange.
Distributed payments - Payments to multiple recipients.
Pooled transaction fees - One transaction pays the fees of others.

![Output Image ](https://github.com/farsh268/Algorand-Protocol-1/blob/main/Farsh-Atomic-Transfer-Bash/static/image/1.jpg)
![Output Image ](https://github.com/farsh268/Algorand-Protocol-1/blob/main/Farsh-Atomic-Transfer-Bash/static/image/2.jpg)

## RUN ON YOUR LOCAL MACHINE

- `git clone` the repository

- `npm install` to install dependencies

```
  $ npm install
```

- `npm start` to start app

```
  $ npm start
```

- or you can easily start app with `node app.js`

```
  $ node app.js
```

## check preview video link

- check video on [here](https://www.awesomescreenshot.com/video/7605378?key=5e006e6360495b5ee0d050653aec551b)

## Transaction on ALGOEXPLORER Testnet 

- https://testnet.algoexplorer.io/tx/IPAAC5ZGKJWYJRVQNJIU662E5DWGFLBTYSY4XKU4HECC3ADLM7TQ


## check Live link

- check Live link [here](https://atomic-transfer.herokuapp.com/)

## Functionalities

- [x] (a) Loading two existing accounts… (Remember to fund the two accounts with Testnet Algos)
- [x] (b) Create a new account (This will be auto-generated)
- [x] (c) Generate a mnemonic for the created account
- [x] (d) Expose the Initial balances of the two existing accounts
- [x] (e) Send a Transaction
- [x] (f) Sign the Transaction
- [x] (g) Display the Transaction Information in a JSON format
- [x] (h) Show the transaction on AlgoExplorer

## Technology used

- Boostrap
- Font Awesome
- NodeJs
- EJS
- Algorand
