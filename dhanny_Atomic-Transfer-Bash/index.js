#!/usr/bin/env node

import readline from 'readline'

import algosdk, { waitForConfirmation } from 'algosdk';
import { config } from 'dotenv';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import { type } from 'os';

config()

const BANNER = `
CHOICE COIN
ATOMIC TRANSFER
`

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));


const algodToken = {
    "X-API-key": process.env.ALGOD_TOKEN
};
const algodServer = process.env.ALGOD_ADDRESS
const algodPort = '';
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)

const createAccount = function() {
    try {  
        const myaccount = algosdk.generateAccount();
        let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
        console.log(chalk.cyan("Receivers Address = " + myaccount.addr));
        console.log(chalk.cyan("Receivers Mnemonic = "+ account_mnemonic));
        return myaccount;
    }
    catch (err) {
        console.log("err", err);
    }
};


const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
        process.stdin.setRawMode(false)
        resolve()
    })) 
}

const sleep = async(ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

const getUserInformation = async(addr) => {
    try{
        const spinner = createSpinner(`Getting Account Information of address ${addr}`).start();
        const accountInfo = await algodClient.accountInformation(addr).do()
        spinner.success('Got information successfully')
        return accountInfo
    } catch(error) {
        console.log()
        console.log(chalk.red(error.message))
        process.exit(1)
    }
}


const getAmount = async(account1, account2) => {
    try{
        let amount = null
        while (true){
            amount = await prompt('Enter Amount to send (algo): ')
            amount = Number(amount)
            if (!isNaN(amount)){
                if (amount > account1.info.amount ){
                    console.log(chalk.yellow(`Account balance on ${account1.addr} is less than the amount`))
                    continue
                }
                else if (amount > account2.info.amount) {
                    console.log(chalk.yellow(`Account balance on ${account2.addr} is less than the amount`))
                    continue
                }
                else {
                    break
                }
            }
            console.log(chalk.yellow("Please type in a number"))
        }
        return amount
    } catch (error){
        console.log(error.message)
        process.exit(1)
    }
}

const run = async() => {
    try {
        console.clear();
        figlet(BANNER, (err, data) => {
            console.log(gradient.pastel.multiline(data))
        })
        await sleep()
        const account1 = algosdk.mnemonicToSecretKey(process.env.FIRST_ACCOUNT_MNEMONIC);
        const account2 = algosdk.mnemonicToSecretKey(process.env.SECOND_ACCOUNT_MNEMONIC);
        
        let account1Info = await getUserInformation(account1.addr)
        let account2Info = await getUserInformation(account2.addr)

        account1['info'] = {amount: account1Info.amount / 1000000, assets: account1Info.assets.length}
        account2['info'] = {amount: account2Info.amount / 1000000, assets: account2Info.assets.length}
        
        console.table([{'address': account1.addr, 'amount': account1.info.amount}, {'address': account2.addr, 'amount': account2.info.amount}])
        console.log('Press enter to generate receiver account')
        await keypress()
        const account3 = createAccount()
    

        const amount = await getAmount(account1, account2);
        console.log(`Sending ${amount} algo on both accounts to ${account3.addr}`)
        const params = await algodClient.getTransactionParams().do()
        params.flatFee = true
        params.fee = algosdk.ALGORAND_MIN_TX_FEE
        
        const transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: account1.addr, 
            to: account3.addr,
            amount: amount * 1000000,
            suggestedParams: params
        })
        const transaction2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: account2.addr, 
            to: account3.addr, 
            amount: amount * 1000000,
            suggestedParams: params
        })
    
        const txns = [transaction1, transaction2]
        const txgroup = algosdk.assignGroupID(txns)
    
        const signedTx1 = transaction1.signTxn(account1.sk)
        const signedTx2 = transaction2.signTxn(account2.sk)
    
        const signed = [signedTx1, signedTx2]
        console.log('Signed Tranasctions')
        const tx = await algodClient.sendRawTransaction(signed).do()
        console.log(chalk.green(`View transaction on:  https://testnet.algoexplorer.io/tx/${tx.txId}`));
        
        console.log(chalk.yellow(`Waiting for confirmation on ${tx.txId}`))
        const confirmedTxn = await waitForConfirmation(algodClient, tx.txId, 10)
        console.log(chalk.green("Transaction " + tx.txId + " confirmed in    round " + confirmedTxn["confirmed-round"]));

        figlet('BALANCE', (err, data) => {
            console.log(data)
        })

        account1Info = await getUserInformation(account1.addr)
        account2Info = await getUserInformation(account2.addr)
        account1['info'] = {amount: account1Info.amount / 1000000}
        account2['info'] = {amount: account2Info.amount/ 1000000}

        console.table([{'address': account1.addr, 'amount': account1.info.amount}, {'address': account2.addr, 'amount': account2.info.amount}])
        process.exit(0)
    } catch(error) {
        console.log(error.message)
        process.exit(1)
    }

}


run()