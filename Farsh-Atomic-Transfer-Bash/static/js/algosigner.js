const connectWallet2 = document.getElementById("dropdownMenu2");
const walletAddress2 = document.getElementById("wallet_value");
const getAddress2 = document.getElementById("get_address");

const myAlgoSignerConnect = async () => {
  if (!window.AlgoSigner) {
    return alert("Please install AlgoSigner");
  } else {
    try {
      await window.AlgoSigner.connect();

      const address = await window.AlgoSigner.accounts({
        ledger: "TestNet",
      })
        .then((value) => value[0])
        .then((result) => {
          const { address } = result;
          return address;
        })
        .catch((e) => {
          err.textContent = "Error Connecting to Algosigner";
          err.classList.remove("d-none");
          setTimeout(() => {
            err.classList.add("d-none");
          }, 1000);
          console.log("cannot retrieve accounts");
        });
      connectedAddress = address;
      localStorage.setItem("wallet-type", "algosigner");
      getAddress2.classList.remove("d-none");
      getAddress2.classList.add("d-flex");
      walletAddress2.innerHTML = `${address.slice(0, 5)}...${address.slice(
        address.length - 4
      )}`;
      connectWallet2.classList.add("d-none");
    } catch (error) {
      console.error(error);
    }
  }
};
