This is a submission to the rekey bash for multisig
    Run the npm install to install all modules

1)Input the wallet address and mnemonic necessary for the wallet wanting to be rekeyed
2)Call the function rekeytosingle(wallet, mnemonic) to rekey the wallet with a newly generated account.This function rekeys the account and returns the new keys and mnemonics of the account
3)Call the function rekeytosingle(wallet, mnemonic,wallet_obj) to rekey the wallet to the account of your choice.The wallet obj is in the form {addr:' ',mnemonic:' '}. This function rekeys the account and returns the new keys and mnemonics of the account
4)Call the function rekeytomultisig(wallet, mnemonic,no_of_accounts) to rekey the wallet with a newly generated multis account.This allows any of the returned key to sign a transaction
5)Call the function rekeytomultisig(wallet, mnemonic,no_of_accounts=0,accounts) to rekey the wallet with the specified wallets in the accounts array. The accounts object is in the form (array of objects)[
{
addr: '',
mnemonic:'hello'},
{
addr: '',
mnemonic:''
},
{
addr: '',
mnemonic:'',}
].This allows any of the returned key to sign a transaction.
6)Run the check function check(wallet_address) to see the results after rekeying. The auth address field is updated