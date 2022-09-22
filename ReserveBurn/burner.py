import algosdk
from algosdk.v2client import algod
from algosdk import account, encoding, mnemonic, transaction 
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, PaymentTxn, write_to_file

algod_address = "https://node.algoexplorerapi.io" 
algod_token = "" 
headers = {"X-API-Key": algod_token }
algod_client = algod.AlgodClient(algod_token,algod_address,headers)



def burn():
    asset_id = 297995609
    reserve_address = "FG7NNTZU2LMMD2RD3Q5P2T77MESNEU2XXSZKYXKE5TWMXIHTMPJTSCILTA"
    reserve_phrase = mnemonic.to_private_key("")
    params = algod_client.suggested_params()
    amount = 100
    burn_address = "6G5V4U2MCW5TIZ7JP6BZFQELTGGJBEG5EVSQRQQRLEZM3V6DXOPV5TUJQA" 
    transaction = AssetTransferTxn(sender=reserve_address, sp=params, receiver=burn_address, amt=amount, index=asset_id)
    signature = transaction.sign(reserve_phrase)
    algod_client.send_transaction(signature)
    final = transaction.get_txid()

burn()
