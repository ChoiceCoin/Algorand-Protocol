# FARSH_REKEY_BASH SUBMISSION

- The goal of this bash is to rekey your reserved Algorand wallet account to a multisignature account.
  Rekeying is one of the great features on the Algorand blockchain, which enables an account holder to retain
  same public address while effectively rotating the authentic private spending keys.

- This means you can have your public Algorand address and secure it to an existing or set of new private keys you generated securely!

- For example; Ezhia private account key has been compromised, and she needs to change her
  private keys, maintain good security and also give access to trusted third parties of her choice
  without changing her public address, which involves updating everyone who has previously
  saved her address.

- Instead Ezhia can simply issue a special transaction that registers a new private key, as the
  approval method for her existing public address.
  Also she can rekey her account to a multisignature account, which is convenient and her
  security is highly maintained.

## WALKTHROUGH THE CODES 🤓

### Generate the acccounts

Let's first generate the necessary addresses and the private keys needed for the whole rekeying process and the testing

```
mnemonic1 = "patrol target joy dial ethics flip usual fatigue bulb security prosper brand coast arch casino burger inch cricket scissors shoe evolve eternal calm absorb school"

mnemonic2 = "genius inside turtle lock alone blame parent civil depend dinosaur tag fiction fun skill chief use damp daughter expose pioneer today weasel box about silly"

mnemonic3 = "off canyon mystery cable pluck emotion manual legal journey grit lunch include friend social monkey approve lava steel school mango auto cactus huge ability basket"

# For ease of reference, add account public and private keys to
# an accounts dict.

# the two private keys to sign the transaction, could be more
private_key_1 = mnemonic.to_private_key(mnemonic1)
account_1 = mnemonic.to_public_key(mnemonic1)

private_key_2 = mnemonic.to_private_key(mnemonic2)
account_2 = mnemonic.to_public_key(mnemonic2)

# send_to_wallet and sign by the two private keys
private_key_3 = mnemonic.to_private_key(mnemonic3)
account_3 = mnemonic.to_public_key(mnemonic3)


# Generate the reserved Address to be rekeyed
reserved_private_key, reserved_address = account.generate_account()
print("Private key:", reserved_private_key)
print("Reserved Address:", reserved_address)
print("Mnemonic:", mnemonic.from_private_key(reserved_private_key))

```

Here, we have generated the reserved address to be rekeyed into a multisig account. `account_1` and `account_2` are the new set of private keys to be used to sign the transaction after the rekeying is done, while `account_3` is the account with which fund is transferred from the reserved address and signed by the **two private keys**.

### Let's create a multisig account

```
# create a multisig account
version = 1  # multisig version
threshold = 2  # how many signatures are necessary
msig = Multisig(version, threshold, [account_1, account_2])
existing_address = msig.address()
```

The above code shows how to generate a multisignature account composed of three Algorand addresses, with a signing `threshold of 2`, and using `version 1` of the software (currently the only version).

### Connecting to a Node

```
#algod config
algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "" # replace this with your API key
purestake_token = {'X-Api-key': algod_token}
algodclient = algod.AlgodClient(algod_token, algod_address, purestake_token)
```

### Rekeying

Now let’s create the rekey transactions (A zero Algo payment transaction with the `rekey_to` parameter set), sign it with the reserved_address private key, and send it to the network.

The transaction data will require some relatively up-to-date data related to the network, since the transaction needs to submit a **“first”** and **“last”** round that the transaction will be valid for and the genesis hash, so we’ll use algod_client to provide this using the suggested_params() method first.

```
params = algodclient.suggested_params

# Get network params for transactions.
params = algodclient.suggested_params()
gh = params.gh
first_valid_round = params.first
last_valid_round = params.last
fee = params.min_fee

#Rekeying reserved address to multisig account

txn_rekey = transaction.PaymentTxn(reserved_address, fee, first_valid_round, last_valid_round, gh, reserved_address, 0, rekey_to=existing_address)

print("Please go to: https://dispenser.testnet.aws.algodev.network/?account=" +  reserved_address+ " to fund reserved account")
input("Press Enter Key to continue after funding")

stxn_rekey = txn_rekey.sign(reserved_private_key)
txid = algodclient.send_transaction(stxn_rekey)
print("Successfully sent transaction with txID: {}".format(txid))
print("Rekeyed: "+ reserved_address + "\n to a multisig account: " + msig.address()+ " Successfully!!!!")
```

The output in the terminal would look like:

> Note that, In order to complete the rekey transaction a minimum of 1000 microAlgo for the fee is required, and a further 1000 microAlgo to demonstrate the use of our rekeyed account. After funding the reserved address, the rekeying would be done successfully.

### Testing

And there you have it, the reserved account is now set to have the existing account (multisig account) as an authoritative address. Let’s prove this by making a transaction sending 1 Algo to the third generated address `account_3` from the reserved address, but signing it with our existing_private_keys.

```
sender = reserved_address
recipient = account_3
amount = 1000000
note = "Hello Multisig".encode()
txn = PaymentTxn(sender, params, recipient, amount, None, note, None)

# create a SignedTransaction object
mtx = MultisigTransaction(txn, msig)

# sign the transaction
mtx.sign(private_key_1)
mtx.sign(private_key_2)


# send the transaction
txid = algodclient.send_raw_transaction(
    encoding.msgpack_encode(mtx))

# wait for confirmation
try:
    confirmed_txn = wait_for_confirmation(algodclient, txid, 4)
    print("Transaction information: {}".format(
        json.dumps(confirmed_txn, indent=4)))
    print("Decoded note: {}".format(base64.b64decode(
        confirmed_txn["txn"]["txn"]["note"]).decode()))
except Exception as err:
    print(err)
```

And this would successfully send 1 algo from the reserved address(rekeyed to a multisig) to the third account `account_3` and duly signed by the two private keys. Check the output in the terminal below:

### Added Bonus

You can as well infact easily rekey the reserved account to a **singlesig** account by simply put:

```
txn_rekey = transaction.PaymentTxn(reserved_address, fee, first_valid_round, last_valid_round, gh, reserved_address, 0, rekey_to=existing_address)
```

Where the existing address here would be a **singlesig address** with a newly generated private key needed to sign the transaction.

## Conclusion

You have now hopefully found a reserved address that you can further secure by using the awesome rekeying feature! Now you can be the envy of your friends when you give them your custom public Algorand address the next time they need to send you some Algo. :sunglasses:

## RUN ON YOUR LOCAL MACHINE

- cd to the directory where requirements.txt is located.

- activate your virtualenv.

- run: pip install -r requirements.txt in your shell.

- `python rekey.py` to start app

```
  $ python rekey.py
```

## Check preview video link

- check video on [here](https://www.awesomescreenshot.com/video/7215108?key=0ce20a9ccb0957f8c77e35844196bc56)

## Also check out my article on

- https://hashnode.com/post/rekeying-a-reserved-addressinto-a-multisig-account-ckz98mury0mrubbs11l5b6vt6
