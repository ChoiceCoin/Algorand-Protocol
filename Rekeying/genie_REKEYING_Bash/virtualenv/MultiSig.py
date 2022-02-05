import json
from algosdk.v2client import algod
from algosdk import account, encoding, mnemonic
from algosdk.future.transaction import Multisig, PaymentTxn, MultisigTransaction
import base64



mnemonic1 = "patrol target joy dial ethics flip usual fatigue bulb security prosper brand coast arch casino burger inch cricket scissors shoe evolve eternal calm absorb school"
mnemonic2 = "genius inside turtle lock alone blame parent civil depend dinosaur tag fiction fun skill chief use damp daughter expose pioneer today weasel box about silly"
mnemonic3 = "off canyon mystery cable pluck emotion manual legal journey grit lunch include friend social monkey approve lava steel school mango auto cactus huge ability basket"



private_key_1 = mnemonic.to_private_key(mnemonic1)
account_1 = mnemonic.to_public_key(mnemonic1)

private_key_2 = mnemonic.to_private_key(mnemonic2)
account_2 = mnemonic.to_public_key(mnemonic2)

private_key_3 = mnemonic.to_private_key(mnemonic3)
account_3 = mnemonic.to_public_key(mnemonic3)


def wait_for_confirmation(client, transaction_id, timeout):
    """
    Wait until the transaction is confirmed or rejected, or until 'timeout'
    number of rounds have passed.
    Args:
        transaction_id (str): the transaction to wait for
        timeout (int): maximum number of rounds to wait    
    Returns:
        dict: pending transaction information, or throws an error if the transaction
            is not confirmed or rejected in the next timeout rounds
    """
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




version = 1  
threshold = 2  
msig = Multisig(version, threshold, [account_1, account_2])

print("Multisig Address: ", msig.address())
print("Please go to: https://bank.testnet.algorand.network/ to fund multisig account. ", msig.address())


algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "nq1M8RDrIK6CqmXvgdctW1mvuhvgI3nLO2bAk8Aa"
headers = {
    "X-API-Key": algod_token,
}


# Initializing an algod client
algod_client = algod.AlgodClient(algod_token, algod_address, headers)

# get suggested parameters
params = algod_client.suggested_params()


# comment out the next two (2) lines to use suggested fees
params.flat_fee = True
params.fee = 1000

# create a transaction
sender = msig.address()
recipient = account_3
amount = 10000
note = "Multi-Signature Account For genie Created".encode()
txn = PaymentTxn(sender, params, recipient, amount, None, note, None)

# create a SignedTransaction object
mtx = MultisigTransaction(txn, msig)

# sign the transaction
mtx.sign(private_key_1)
mtx.sign(private_key_2)

# print encoded transaction
#print(encoding.msgpack_encode(mtx))

# send the transaction
txid = algod_client.send_raw_transaction(
    encoding.msgpack_encode(mtx))
    # wait for confirmation	
try:
    confirmed_txn = wait_for_confirmation(algod_client, txid, 4)  
    print("Decoded note: {}".format(base64.b64decode(
        confirmed_txn["txn"]["txn"]["note"]).decode()))
    print("Transaction ID For Multi-Sig account:  ", txid)
except Exception as err:
    print(err)

