// Easy and simplified JS software for connecting Pera Wallet.

// Imports
import './App.css';

// Wallet Connect
function WalletConnect() {
  const wallet = () => {
    console.log('Connect')
  }
  return(
    <button onClick={wallet}>Connect Wallet</button>
  )
};

// React functions must return a React component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Choice Coin Connect
        </h1>
        <div>
          <WalletConnect />
        </div>
      </header>
    </div>
  );
}

export default App;

