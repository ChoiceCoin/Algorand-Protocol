import os , json
import easygui

from algosdk import account, mnemonic 
from algosdk.v2client import algod
from algosdk.future import transaction

mn1 = 'shuffle speed split bread mansion limb daughter destroy minimum town pistol slam leaf slide potato mule alpha furnace glass humble ladder kiss eight abandon gasp'
mn2 = 'hazard dust join live water venue few grant neglect road illegal sad mammal demand often must infant horn magic piano goat exchange deny ability tag'

def createAccount():
    private_key, address = account.generate_account()
    print("Receiver address: {}".format(address))
    print("Receivers mnemonic passphrase: {}".format(mnemonic.from_private_key(private_key)))
    return private_key, address

def get_address(mn):
    pk_account_a = mnemonic.to_private_key(mn)
    address = account.address_from_private_key(pk_account_a)
    print("Address :", address)
    return address

def getInfo(algod_client, addr):
    try:
        accountInfo = algod_client.account_info(addr)
        return accountInfo
    except Exception as e:
        print("Error Occured {}".format(str(e)))
        exit()


def printAccount(account_info_1, account_info_2, indent=4):
    try:
        data = [[account_info_1['address'], account_info_1['amount'] / 1000000],
                [account_info_2['address'], account_info_2['amount'] / 1000000]]
        format_row = "{:<2}{:>12}"
        print("{:<60} {:<15}".format("Address","Amount(Algo)"))
        for account in data:
            print(format_row.format(*account))
        print("")
    except Exception as e:
        print("Error Occur: " + str(e))


def transfer():
    try:
        print("########### CHOICE-COIN ATOMIC TRANSFER ##################")
           # user declared algod connection parameters
        algod_address = "https://testnet-algorand.api.purestake.io/ps2"
        algod_token = "HfiEnjsWGW28EEEdqURGt40hxXT3hVSs6nkGAr9Y"
        headers = {"X-API-Key": algod_token }


        # Initialize an algodClient
        algod_client = algod.AlgodClient(algod_token, algod_address, headers)

        account_1 = get_address(mn1)
        account_2 = get_address(mn2)

        account_1_key = mnemonic.to_private_key(mn1)
        account_2_key = mnemonic.to_private_key(mn2)
        print('Getting account information....')
        account_1_info = getInfo(algod_client, account_1)
        account_2_info = getInfo(algod_client, account_2)
        printAccount(account_1_info, account_2_info)


        print('Generating receivers account...')
        acount_3_key, account_3 = createAccount()

        amount = easygui.enterbox("Algo amount")
        amount = int(amount) * 1000000
        print("Creating transactions...")
        params = algod_client.suggested_params()
        txn_1 = transaction.PaymentTxn(account_1, params, account_3, amount)
        txn_2 = transaction.PaymentTxn(account_2, params, account_3, amount)
        print('Calculating Group ID...')
        gid = transaction.calculate_group_id([txn_1, txn_2])
        txn_1.group = gid
        txn_2.group = gid

        print('Signing transaction....')
        stxn_1 = txn_1.sign(account_1_key)
        stxn_2 = txn_2.sign(account_2_key)
        signed_group = [stxn_1, stxn_2]
        print('Sending Transaction')
        tx_id = algod_client.send_transactions(signed_group)
        print("TransactionId: {}".format(tx_id))
        confirmed_txn = transaction.wait_for_confirmation(algod_client, tx_id)
        print("Transaction confirmed")
        print(f'Visit https://testnet.algoexplorer.io/tx/{tx_id}')
        print("Transaction information: {}\n".format(json.dumps(confirmed_txn)))
    except Exception as e:
        print("Error occured: " + str(e))




if __name__ == '__main__':
    transfer()