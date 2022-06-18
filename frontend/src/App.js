import './App.css';

const App = () => {
    const checkIfWalletIsConnected = () => {
        try {
            const { solana } = window;
            if (solana) {
                if (solana.isPhantom) {
                    console.log("Phantom wallet found");
                }
            } else {
                alert("Solana obj not found, get a Phantom wallet")
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default App;