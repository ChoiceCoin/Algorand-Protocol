### Atomic transfers 

In traditional finance, trading assets generally requires a trusted intermediary, like a bank or an exchange, to make sure that both sides receive what they agreed to. On the Algorand blockchain, this type of trade is implemented within the protocol as an Atomic Transfer. This simply means that transactions that are part of the transfer either all succeed or all fail. Atomic transfers allow complete strangers to trade assets without the need for a trusted intermediary, all while guaranteeing that each party will receive what they agreed to.

On Algorand, atomic transfers are implemented as irreducible batch operations, where a group of transactions are submitted as a unit and all transactions in the batch either pass or fail. This also eliminates the need for more complex solutions like hashed timelock contracts that are implemented on other blockchains. An atomic transfer on Algorand is confirmed in less than 5 seconds, just like any other transaction. Transactions can contain Algos or Algorand Standard Assets and may also be governed by Algorand Smart Contracts.

### Use cases 

Atomic transfers enable use cases such as:

Circular trades - Alice pays Bob if and only if Bob pays Claire if and only if Claire pays Alice.

Group payments - Everyone pays or no one pays.

Decentralized exchanges - Trade one asset for another without going through a centralized exchange.

Distributed payments - Payments to multiple recipients.

Pooled transaction fees - One transaction pays the fees of others.

### Dependencies | Run

```pip install py-algorand-sdk``` 

```python atomic_transfer.py```

### Transaction Information 

```
Transaction information: {
"confirmed-round": 19995459,
"pool-error": "",
"txn": {
"sig": "7A/kJi+0DMOeSHKjmpAge1F1ZY6dts1NoF2dXmFcHFjG45/mQh7v8qgY3o5Bh+qbn16YUxx9ilsOTniQgBntAA==",
 "txn": {
"amt": 1000000,
"fee": 1000,
"fv": 19995457,
"gen": "testnet-v1.0",
"gh": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
"grp": "wuWosfMSKZYIEx45FY1ZghSuqbiHBgVL8/XVTnPm2Sw=",
"lv": 19996457,
"rcv": "6WSU7NSMCYMPIREYJ6EXAXJESZ3N6EAT5M4ALQVPC5DXN3AX7JZ7RKICXQ",
"snd": "PUGUUTD4TYPW7YCGBSYWN2AEXDWNMZA5RSYYXLE6DXC5QG6YRUQCYMHKWQ",
"type": "pay"
}
}
}
Transaction information: {
"confirmed-round": 19995459,
"pool-error": "",
"txn": {
"sig": "4KP6lBjOz36swFI64eq91dEGbrO5SONatfC+VR3/fIxzUm/ABS9ebtiAIA62Mo8AR/0LTqERSJpV5uPD3XBpBQ==",
 "txn": {
"amt": 2000000,
"fee": 1000,
"fv": 19995457,
"gen": "testnet-v1.0",
"gh": "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
"grp": "wuWosfMSKZYIEx45FY1ZghSuqbiHBgVL8/XVTnPm2Sw=",
"lv": 19996457,
"rcv": "PUGUUTD4TYPW7YCGBSYWN2AEXDWNMZA5RSYYXLE6DXC5QG6YRUQCYMHKWQ",
"snd": "5JKGI32M6RJFJXM32FGWV64SRZ2LAJMMLQVCABZ3BCJ53BYN46VWJXQDLU",
"type": "pay"
}
}
}
```
