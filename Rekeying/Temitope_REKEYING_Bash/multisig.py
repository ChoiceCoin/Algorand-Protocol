from algosdk import mnemonic
from algosdk.future.transaction import Multisig
# Shown for demonstration purposes. NEVER reveal secret mnemonics in practice.
# Change these values to use the accounts created previously.
# Change these values with mnemonics
mnemonic1 = "price thumb gun antenna frame surge little trophy firm  license acid survey rely bunker swear define figure nothing crazy gaze receive giggle heart about lift"
mnemonic2 = "retire clap gold census surround industry reform shove fade outside electric artist frown pizza caught labor mixed learn crash step buffalo vacant bamboo above friend"
 # mnemonic3 = "goat oval reduce second emotion elavator typical trend grape cactus measure brand fatigue answer gasp actor remember photo speed unknown direct catalog lawn ability length"

private_key_1 = mnemonic.to_private_key(mnemonic1)
account_1 = mnemonic.to_public_key(mnemonic1)

private_key_2 = mnemonic.to_private_key(mnemonic2)
account_2 = mnemonic.to_public_key(mnemonic2)


# create a multisig account
version = 1  # multisig version
threshold = 2  # how many signatures are necessary
msig = Multisig(version, threshold, [account_1, account_2])
print("Multisig Address: ", msig.address())
print("Please go to: https://bank.testnet.algorand.network/ to fund multisig account.", msig.address())