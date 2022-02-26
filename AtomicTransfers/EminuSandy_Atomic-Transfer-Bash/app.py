import os

import dotenv
from algosdk import account, mnemonic 
from algosdk.v2client import algod
from algosdk.future import transaction
import colorama

dotenv.load_dotenv()


def banner(msg):
    print(colorama.Style.BRIGHT + "#" * 100)
    print(msg.center(100))
    print("#" * 100)

def createAccount():
    private_key, address = account.generate_account()
    print(colorama.Style.NORMAL + colorama.Fore.YELLOW + "Receiver address: {}".format(address))
    print("Receivers mnemonic passphrase: {}".format(mnemonic.from_private_key(private_key)))
    return private_key, address



def getInfo(algod_client, addr):
    try:
        accountInfo = algod_client.account_info(addr)
        return accountInfo
    except Exception as e:
        print("Error Occured {}".format(str(e)))
        exit()


def printAccount(account_info_1, account_info_2, indent=4):
    try:
        print("")
        banner("Available Account")
        data = [[account_info_1['address'], account_info_1['amount'] / 1000000],
                [account_info_2['address'], account_info_2['amount'] / 1000000]]
        format_row = "{:<2}{:>12}"
        print(colorama.Style.BRIGHT + colorama.Fore.GREEN +"{:<60} {:<15}".format("Address","Amount(Algo)"))
        for account in data:
            print(format_row.format(*account))
        print("")
    except Exception as e:
        print("Error Occur: " + str(e))


def main():
    try:
        # print("########### CHOICE COIN ATOMIC TRANSFER ##################")
        banner("CHOICE COIN ATOMIC TRANSFER")
        algod_client = algod.AlgodClient(os.getenv('ALGOD_TOKEN'), os.getenv('ALGOD_ADDRESS'), headers={"X-API-key": os.getenv('ALGOD_TOKEN')})
        account_1 = os.getenv('FIRST_USER_ADDRESS')
        account_2 = os.getenv('SECOND_USER_ADDRESS')
        account_1_key = mnemonic.to_private_key(os.getenv('FIRST_USER_MNEMONIC'))
        account_2_key = mnemonic.to_private_key(os.getenv('SECOND_USER_MNEMONIC'))
        print('Getting account information....')
        account_1_info = getInfo(algod_client, account_1)
        account_2_info = getInfo(algod_client, account_2)
        printAccount(account_1_info, account_2_info)


        print('Generating receivers account...')
        acount_3_key, account_3 = createAccount()

        amount = input(f"{colorama.Fore.GREEN}[+] {colorama.Fore.RESET}Specify amount in algo:> ")
        amount = int(amount) * 1000000
        print("Creating transactions...")
        params = algod_client.suggested_params()
        txn_1 = transaction.PaymentTxn(account_1, params, account_3, amount)
        txn_2 = transaction.PaymentTxn(account_2, params, account_3, amount)
        print(colorama.Fore.RESET + colorama.Style.BRIGHT + 'Calculating Group ID...')
        gid = transaction.calculate_group_id([txn_1, txn_2])
        txn_1.group = gid
        txn_2.group = gid

        print('Signing transaction....')
        stxn_1 = txn_1.sign(account_1_key)
        stxn_2 = txn_2.sign(account_2_key)
        signed_group = [stxn_1, stxn_2]
        print(colorama.Fore.GREEN + 'Sending Transaction')
        tx_id = algod_client.send_transactions(signed_group)
        print("TransactionId: {}".format(tx_id))
        confirmedTxn = transaction.wait_for_confirmation(algod_client, tx_id)
        print("Transaction confirmed")
        print(f"Visit https://testnet.algoexplorer.io/tx/{tx_id}")
    except Exception as e:
        print("Error occured: " + str(e))




if __name__ == '__main__':
    main()