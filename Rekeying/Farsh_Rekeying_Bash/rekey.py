import json
import base64
from algosdk.v2client import algod
from algosdk import mnemonic, account, encoding
from algosdk import transaction
from algosdk.future.transaction import Multisig, PaymentTxn, MultisigTransaction


# utility for waiting on a transaction confirmation
def wait_for_confirmation(client, transaction_id, timeout):
    start_round = client.status()["last-round"] + 1
    current_round = start_round

    while current_round < start_round + timeout:
        try:
            pending_txn = client.pending_transaction_info(transaction_id)
        except Exception:
            return 
        if pending_txn.get("confirmed-round", 0) > 0:
            return pending_txn
        elif pending_txn["pool-error"]:  
            raise Exception(
                'pool error: {}'.format(pending_txn["pool-error"]))
        client.status_after_block(current_round)                   
        current_round += 1
    raise Exception(
        'pending tx not found in timeout rounds, timeout value = : {}'.format(timeout))


mnemonic1 = "patrol target joy dial ethics flip usual fatigue bulb security prosper brand coast arch casino burger inch cricket scissors shoe evolve eternal calm absorb school"
mnemonic2 = "genius inside turtle lock alone blame parent civil depend dinosaur tag fiction fun skill chief use damp daughter expose pioneer today weasel box about silly"
mnemonic3 = "off canyon mystery cable pluck emotion manual legal journey grit lunch include friend social monkey approve lava steel school mango auto cactus huge ability basket"

#For ease of reference, add account public and private keys to
# an accounts dict.

#the two private keys to sign the transaction, could be more
private_key_1 = mnemonic.to_private_key(mnemonic1)
account_1 = mnemonic.to_public_key(mnemonic1)

private_key_2 = mnemonic.to_private_key(mnemonic2)
account_2 = mnemonic.to_public_key(mnemonic2)

#send_to_wallet and sign by the two private keys
private_key_3 = mnemonic.to_private_key(mnemonic3)
account_3 = mnemonic.to_public_key(mnemonic3)


##Generate the reserved Address to be rekeyed
reserved_private_key, reserved_address = account.generate_account()
print("Private key:", reserved_private_key)
print("Address:", reserved_address)
print("Mnemonic:", mnemonic.from_private_key(reserved_private_key))


# create a multisig account
version = 1  # multisig version
threshold = 2  # how many signatures are necessary
msig = Multisig(version, threshold, [account_1, account_2])
existing_address = msig.address()



#algod config
algod_address = "https://testnet-algorand.api.purestake.io/ps2" 
algod_token = "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T" # replace this with your API key
purestake_token = {'X-Api-key': algod_token} 


algodclient = algod.AlgodClient(algod_token, algod_address, purestake_token)
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

input('Proceed to carry out further transaction')

sender = reserved_address
recipient = account_3
amount = 10000
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