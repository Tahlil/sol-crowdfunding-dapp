import './App.css';
import { useEffect, useState } from "react";

const App = () => {
        const [walletAddress, setWalletAddress] = useState(null);
        const checkIfWalletIsConnected = async() => {
            try {
                const { solana } = window;
                if (solana) {
                    if (solana.isPhantom) {
                        console.log("Phantom wallet found");
                        const response = await solana.connect({
                            onlyIfTrusted: true
                        });
                        console.log("Connected with public key: " + response.publicKey.toString());
                        setWalletAddress(response.publicKey.toString());
                    }
                } else {
                    alert("Solana obj not found, get a Phantom wallet")
                }
            } catch (error) {
                console.error(error);
            }
        };

        const connectWallet = async() => {
            const {solana} = window;
            if (solana) {
                const response = await solana.connect();
                console.log("Connected with public key: " + response.publicKey.toString());
                setWalletAddress(response.publicKey.toString());
            }
        }

        const renderNotConnectedContainer = () => ( < button onClick = { connectWallet } > Connect to Wallet </button>)
            useEffect(() => {
                const onload = async() => {
                    await checkIfWalletIsConnected();
                }
                window.addEventListener('load', onload)
                return () => window.removeEventListener('load', onload)
            }, []);
            return (
                <div className="App">
                    {!walletAddress && renderNotConnectedContainer()}
                </div>
            )
        }

        export default App;