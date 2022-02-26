const server = "https://testnet-algorand.api.purestake.io/ps2";
const token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};

const port = "";
const algoClient = new algosdk.Algodv2(token, server, port);

function myFunction() {
  TextToCopy = connectedAddress;
  var TempText = document.createElement("input");
  TempText.value = TextToCopy;
  document.body.appendChild(TempText);
  TempText.select();
  document.body.removeChild(TempText);
  alert("Voter's wallet Address is: " + TempText.value);
}

$(function () {
  $(document).scroll(function () {
    var $nav = $(".fixed");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});

let connectedAddress;
const err = document.getElementById("error");
const success = document.getElementById("success");
const address1 = "IHFYDNOXHI5GOMVUYGWL6WBG6C3PLNWHH22GJKJMV6JKLUJX5YAD6EEHPY";
const address2 = "MYTNPFZCPLBE7K6OWK4UY3FO3ZML7KJLTCWJWOJ2GJION2HR2CNMUDFS2A";
const addresses = [address1, address2];
const balances = [];
let isloading = true;
const getWalletType = localStorage.getItem("wallet-type");
const lastInfo = localStorage.getItem("Transaction Id");
!lastInfo
  ? (document.getElementById("txId").textContent =
      "Carry out your first Transaction to display Info...")
  : (document.getElementById("txId").textContent = lastInfo);

let txns = [];
let base64Txns = [];
let Txns = [];

const generateAccount = () => {
  try {
    const { addr, sk } = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(sk);
    document.getElementById("address").textContent = addr;
    document.getElementById("mnemonic").textContent = mnemonic;
    document.getElementById("generated").classList.remove("d-none");
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const loader = () => {
  if (isloading) {
    document.getElementById("spinner-box").innerHTML =
      "<div class='loader'>Loading...</div>";
  } else {
    document.getElementById("spinner-box").innerHTML =
      '<button onclick="myAlgoSignerSign()" class="btn btn-dark" id="spinner">Send</button>';
  }
};

// get balance of the two addresses
const getBalance = async () => {
  for (address of addresses) {
    const accountInfo = await algoClient.accountInformation(address).do();
    balances.push(parseFloat(accountInfo["amount"] / 1000000).toFixed(2));
    document.getElementById("balance1").textContent = balances[0] + " $Algo";
    document.getElementById("balance2").textContent = balances[1] + " $Algo";
  }
};
getBalance();
const loadAddresses = () => {
  document.getElementById("address1").textContent = address1;
  document.getElementById("address2").textContent = address2;
  document.getElementsByClassName("load")[0].classList.add("d-flex");
};

const myAlgoSignerSign = async () => {
  loader();
  if (!connectedAddress) {
    err.textContent = "Connect Wallet and Try Again";
    err.classList.remove("d-none");
    setTimeout(() => {
      err.classList.add("d-none");
    }, 1500);
    isloading = false;
    loader();
    isloading = true;
  } else {
    let amount = Number(document.getElementById("amount").value); // Enter the amount of Choice
    if (addresses) {
      const params = await algoClient.getTransactionParams().do();
      for (address of addresses) {
        let transaction = new algosdk.Transaction({
          to: address,
          from: connectedAddress,
          amount: parseInt(amount * 1000000),
          suggestedParams: params,
        });
        txns.push(transaction);
      }
    }
    await algosdk.assignGroupID(txns);
    // If Algosigner account is connected, Use the AlgoSigner extension to make the transactions base64
    if (getWalletType === "algosigner") {
      try {
        txns.map((transaction) => {
          base64Txns.push({
            txn: AlgoSigner.encoding.msgpackToBase64(transaction.toByte()),
          });
        });

        const signedTxn = await AlgoSigner.signTxn(base64Txns);
        const binarySignedTx = signedTxn.map((txn) =>
          AlgoSigner.encoding.base64ToMsgpack(txn.blob)
        );
        const response = await algoClient
          .sendRawTransaction(binarySignedTx)
          .do();
        const confirmedTxn = await waitForConfirmation(response.txId, 4);
        if (response) {
          success.textContent = "Transaction Successful";
          success.classList.remove("d-none");
          setTimeout(() => {
            success.classList.add("d-none");
          }, 1500);
        }
        isloading = false;
        loader();
        console.log("Txns", txns);
        localStorage.setItem("Transaction Id", JSON.stringify(response));
        document.getElementById("txId").textContent = lastInfo;
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        console.log(error.message);
        err.textContent = "Transaction Failed, try again";
        err.classList.remove("d-none");
        setTimeout(() => {
          err.classList.add("d-none");
          window.location.href = "/";
        }, 1500);
        isloading = false;
        loader();
      }
    } else {
      try {
        // else if myAlgoWallet is connected, sign the transaction using..
        txns.map((txn) => {
          Txns.push(txn.toByte());
        });
        const signedTxn = await myAlgoConnect.signTransaction(Txns);
        const SignedTx = signedTxn.map((txn) => {
          return txn.blob;
        });
        response = await algodClient.sendRawTransaction(SignedTx).do();
        const confirmedTxn = await waitForConfirmation(response.txId, 4);
        if (response) {
          success.textContent = "Transaction Successful";
          success.classList.remove("d-none");
          setTimeout(() => {
            success.classList.add("d-none");
          }, 1500);
        }
        isloading = false;
        loader();
        localStorage.setItem("Transaction Id", JSON.stringify(response));
        document.getElementById("txId").textContent = lastInfo;
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } catch (error) {
        err.textContent = "Transaction Failed, try again";
        err.classList.remove("d-none");
        setTimeout(() => {
          err.classList.add("d-none");
          window.location.href = "/";
        }, 1500);
        isloading = false;
        loader();
      }
    }
  }
};

const waitForConfirmation = async function (txId, timeout) {
  if (algoClient == null || txId == null || timeout < 0) {
    throw new Error("Bad arguments");
  }

  const status = await algoClient.status().do();
  if (status === undefined) {
    throw new Error("Unable to get node status");
  }

  const startround = status["last-round"] + 1;
  let currentround = startround;

  while (currentround < startround + timeout) {
    const pendingInfo = await algoClient
      .pendingTransactionInformation(txId)
      .do();
    if (pendingInfo !== undefined) {
      if (
        pendingInfo["confirmed-round"] !== null &&
        pendingInfo["confirmed-round"] > 0
      ) {
        //Got the completed Transaction
        return pendingInfo;
      } else {
        if (
          pendingInfo["pool-error"] != null &&
          pendingInfo["pool-error"].length > 0
        ) {
          // If there was a pool error, then the transaction has been rejected!
          throw new Error(
            "Transaction " +
              txId +
              " rejected - pool error: " +
              pendingInfo["pool-error"]
          );
        }
      }
    }
    await algoClient.statusAfterBlock(currentround).do();
    currentround++;
  }

  throw new Error(
    "Transaction " + txId + " not confirmed after " + timeout + " rounds!"
  );
};
