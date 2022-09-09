# Choice Connect

[New Choice Coin Connect Repository](https://github.com/ChoiceCoin/Algorand-Protocol/tree/main/choiceconnect)

Project intended to create a simplified, easy, and secure web connection method for Pera Wallet. 

[Algorand Forum Post](https://forum.algorand.org/t/choice-coin-connect-for-algorand-addresses/7796)

[Algorand JS-SDK Docs](https://developer.algorand.org/docs/sdks/javascript/) | 
[Wallet Connect Docs](https://developer.algorand.org/docs/get-details/walletconnect/) |
[Pera Connect](https://github.com/perawallet/connect) | [PeraWallet Connect Docs](https://docs.perawallet.app/references/pera-connect/)

# Problem

A major problem on the Algorand blockchain is the lack of scalable and secure open source code for connecting the perawallet to decentralized applications.
The problem with the existing solutions is that they use too much unnecesary code, which creates vulnerabilities and makes it difficult to use for open source development because the convolutions create difficulty for developers.

[PeraWallet Issue](https://github.com/perawallet/connect/issues/32)

[PeraWallet Issue2](https://github.com/perawallet/connect-examples/issues/2)

# Issues
Current wallet connection on Algorand has two major security problems and vulnerabilities.

1. Hackers are able to view address information remotely.
2. There is an inherent ambiguity in the Disconnect function in many Algorand applications.

# Goal

The goal for this project is to develop a secure wallet connection resource for open source development and use.

# Solution

The purpose for this project is to develop a simplified and scalable methodology for developing wallet connection mechanisms with Algorand applications. The solution will:

1. Allow a user to click a connect address button to recieve a QR code to scan and connect their address.
2. Allow a user to click a disconnect address button to disconnect their address.

# User Interface
<img width="778" alt="Screen Shot 2022-09-07 at 9 14 24 PM" src="https://user-images.githubusercontent.com/43055154/189033099-ba7362ff-6189-4f27-8342-74f6dfd450a1.png">

