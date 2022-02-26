const host = "https://testnet-algorand.api.purestake.io/ps2";
const Token = {
  "X-API-Key": "EaUlAQzl9Z831PDt5GTxV7fMjYk9CsSK2VmERE4T",
};
("https://algoexplorerapi.io");
const Port = "";
const algodClient = new algosdk.Algodv2(Token, host, Port);

const connectWallet = document.getElementById("dropdownMenu2");
const walletAddress = document.getElementById("wallet_value");
const getAddress = document.getElementById("get_address");
let walletType;

const myAlgoConnect = new MyAlgoConnect();
const myAlgoWalletConnect = async () => {
  try {
    let response = await myAlgoConnect.connect();
    const { address, name } = response[0]; //get name and address of the voter

    getAddress.classList.remove("d-none");
    getAddress.classList.add("d-flex");
    walletAddress.innerHTML = `${address.slice(0, 5)}...${address.slice(
      address.length - 4
    )}`;
    connectWallet.classList.add("d-none");
    connectedAddress = address;
    localStorage.setItem("wallet-type", "algowallet");
  } catch (error) {
    console.error(error);
  }
};
