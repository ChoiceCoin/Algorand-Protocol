### Intro

An Atomic Transfer is an operation that allows multiple transactions which are compiled as one to either succed or fail as a whole.
On Algorand, atomic transfers are implemented as irreducible batch operations, where a group of transactions are submitted as a unit and all transactions in the batch either pass or fail.

Atomic transfers enable use cases such as:
Circular trades - Alice pays Bob if and only if Bob pays Claire if and only if Claire pays Alice.
Group payments - Everyone pays or no one pays.
Decentralized exchanges - Trade one asset for another without going through a centralized exchange.
Distributed payments - Payments to multiple recipients.
Pooled transaction fees - One transaction pays the fees of others.

### Problems

(a) Loading two existing accounts… (Remember to fund the two accounts with Testnet Algos)
(b) Create a new account (This will be auto-generated)
(c) Generate a mnemonic for the created account
(d) Expose the Initial balances of the two existing accounts
(e) Send a Transaction
(f) Sign the Transaction
(g) Display the Transaction Information in a JSON format
(h) Show the transaction on AlgoExplorer

### Run_Steps | Dependencies

```
pip install py-algorand-sdk
pip install easygui

python transfer.py
```

### Output

########### CHOICE COIN ATOMIC TRANSFER ##################
Address : G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I
Address : BXUPLYBQKDMIACBSSUG2WYE2MCEDQMLO3V4GN4VNEVGD3O3DHDPYCJO32U
Getting account information....

Address Amount(Algo)  
G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I 21.996
BXUPLYBQKDMIACBSSUG2WYE2MCEDQMLO3V4GN4VNEVGD3O3DHDPYCJO32U 12.996

Generating receivers account...
Receiver address: QKSBB2PHAX6ZV4MXI3GFAH43PKGNXVMERIT4S7WS3HOTYMMWCRG3LSXA3I
Receivers mnemonic passphrase: vicious found input liberty scout denial hunt auto canoe century process field output crater knee garbage gather hen gather combine raw night fish about web
Creating transactions...
Calculating Group ID...
Signing transaction....
Sending Transaction
TransactionId: YPGLQMVXYP26POEMGAK6ZI3JGIXZUDNPSSRA5VO63Z2HEBS3TZ2Q
Transaction confirmed
Visit https://testnet.algoexplorer.io/tx/YPGLQMVXYP26POEMGAK6ZI3JGIXZUDNPSSRA5VO63Z2HEBS3TZ2Q

C:\Users\AGASTRONICS\Documents\Algorand-Protocol\MoonX_Atomic_Transfer_Bash>python transfer.py
########### CHOICE-COIN ATOMIC TRANSFER ##################
Address : G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I
Address : BXUPLYBQKDMIACBSSUG2WYE2MCEDQMLO3V4GN4VNEVGD3O3DHDPYCJO32U
Getting account information....
Address Amount(Algo)  
G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I 20.995
BXUPLYBQKDMIACBSSUG2WYE2MCEDQMLO3V4GN4VNEVGD3O3DHDPYCJO32U 11.995

Generating receivers account...
Receiver address: MA6FVFG425UG4Y3OAS7AIJURN6EUCG2JTZNPNMFYHZAYD3BZ64U2HTELMY
Receivers mnemonic passphrase: diet panther coast twelve ceiling desert clay excite whip quit vote empty impact rather crash memory rude fog uncle conduct frown nose point abstract peasant
Creating transactions...
Calculating Group ID...

C:\Users\AGASTRONICS\Documents\Algorand-Protocol\MoonX_Atomic_Transfer_Bash>python transfer.py
########### CHOICE-COIN ATOMIC TRANSFER ##################
Address : G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I
Address : BXUPLYBQKDMIACBSSUG2WYE2MCEDQMLO3V4GN4VNEVGD3O3DHDPYCJO32U
Getting account information....
Address Amount(Algo)  
G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I 19.994
BXUPLYBQKDMIACBSSUG2WYE2MCEDQMLO3V4GN4VNEVGD3O3DHDPYCJO32U 10.994

Generating receivers account...
Receiver address: CW6BRK2EDZFWANW6EYDSM4RTYVJCB3SBZOA7E2B2TFHII7S6PEMSFX6L5A
Receivers mnemonic passphrase: trophy canoe border wrist method crack blind bullet explain blade thought obscure coin gravity disagree dawn rifle bird night achieve inject unit galaxy abstract chair
Creating transactions...
Calculating Group ID...
Signing transaction....
Sending Transaction
TransactionId: S25MV4IQQD7YCII65WSLQQ7WGEHD3G37AMVJAX4KK6VNTCFNRWSA
Transaction confirmed
Visit https://testnet.algoexplorer.io/tx/S25MV4IQQD7YCII65WSLQQ7WGEHD3G37AMVJAX4KK6VNTCFNRWSA
Transaction information:

```
{"confirmed-round": 20014254, "pool-error": "", "txn": {"sig": "1UB90z7Sq6rECd3/iF3wP/uriImSWc8sW/oDHi7r0nG/QN5vCPxqrSv8nBnBCAQhRMqFnqjCQIDYaUfGCKxpAw==", "txn": {"amt": 1000000, "fee": 1000, "fv": 20014251, "gen": "testnet-v1.0", "gh": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=", "grp": "pAb1xTZDjX1HKRGSRKJECT9MDB/r1gHqmlRHbawyqgU=", "lv": 20015251, "rcv": "CW6BRK2EDZFWANW6EYDSM4RTYVJCB3SBZOA7E2B2TFHII7S6PEMSFX6L5A", "snd": "G4SMONIZW4NOPGBJ5W7G5MCPR6VUFCA3LSQEGYBVYYFJM4OA76YIH6CX6I", "type": "pay"}}}
```
