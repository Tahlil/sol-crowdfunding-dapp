import './App.css';
import { useEffect } from "react";

const App = () => {
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
                }
            } else {
                alert("Solana obj not found, get a Phantom wallet")
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const onload = async() => {
            await checkIfWalletIsConnected();
        }
        window.addEventListener('load', onload)
        return () => window.removeEventListener('load', onload)
    }, [])
}

export default App;