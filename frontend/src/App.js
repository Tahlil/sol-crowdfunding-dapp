import './App.css';
import idl from './idl.json';
import {Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {Program, AnchorProvider, web3, utils, BN} from '@project-serum/anchor'
import { useEffect, useState } from "react";

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
    preFlightComitment: 'processed'
} 

const App = () => {
        const [walletAddress, setWalletAddress] = useState(null);
        const getProvider = () => {
            const connection = new Connection(network, opts.preFlightComitment)
            const provider = new AnchorProvider(connection, window.solana, opts.preFlightComitment)
        }
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