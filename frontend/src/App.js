import './App.css';
import idl from './idl.json';
import {Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import {Program, AnchorProvider, web3, utils, BN} from '@project-serum/anchor'
import React, {useEffect, useState} from "react";
import {Buffer} from 'buffer';
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
window.Buffer = Buffer;

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
    preFlightComitment: 'processed'
} 

const App = () => {
        const [walletAddress, setWalletAddress] = useState(null);
        const [campaigns, setCampaigns] = useState([]);
        const getProvider = () => {
            const connection = new Connection(network, opts.preFlightComitment)
            const provider = new AnchorProvider(connection, window.solana, opts.preFlightComitment)
            return provider;
        }
        const { SystemProgram } = web3;
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

        const getCampaigns = async () => {
            const connection = new Connection(network, opts.preFlightComitment);
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            Promise.all(
                (await connection.getProgramAccounts(programID)).map(async (campaign)=>(
                    {
                        ...(await program.account.campaign.fetch(campaign.pubkey)),
                        pubkey: campaign.pubkey
                    }
                ) )
                ).then((campaigns) => setCampaigns(campaigns));
        }

        const createCampaign = async () => {
            try {
                const provider = getProvider();
                const program = new Program(idl, programID, provider);
                const [campaign] = await PublicKey.findProgramAddress([
                    utils.bytes.utf8.encode("CAMPAIGN_DAPP"),
                    provider.wallet.publicKey.toBuffer(),
                ],
                program.programId
                );
                await program.rpc.create("campaign name", "campaign description", {
                    accounts: {
                        campaign,
                        user: provider.wallet.publicKey,
                        systemProgram: SystemProgram.programId
                    }
                })
                console.log("Create a new campaign with address: " + campaign.toString());
            } catch (error) {
                console.error("Error creating campaign: " + error);
            }
        } 

        const withdraw  = async (publicKey) => {
            try {
                const provider = getProvider();
                const program = new Program(idl, programID, provider);
                await program.rpc.withdraw(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
                    accounts: {
                        campaign: publicKey,
                        user: provider.wallet.publicKey,
                    }
                });
                console.log("Witdraw 0.2 sol");
            } catch (error) {
                console.error("Error withdrawing: " + error);
            }
        }

        const donate = async (pubkey) => {
            try {
                const provider = getProvider();
                const program = new Program(idl, programID, provider);
                await program.rpc.donate(new BN(0.2 * web3.LAMPORTS_PER_SOL), {
                    accounts: {
                        campaign: publicKey,
                        user: provider.wallet.publicKey,
                        systemProgram: SystemProgram.programId
                    }
                });
                console.log("Donated some money to "+ publicKey.toString());
                getCampaigns();
            } catch (error) {
                console.error("Error donating " + error);
            }
        }
        const renderNotConnectedContainer = () => ( 
        <div>
        <button onClick = { connectWallet } > Connect to Wallet </button>
        <button onClick = { getCampaigns } > Get Campaigns </button>
        <br/>
       {campaigns.map(campaign => (
           <div>
               <p>Campaign ID: {campaign.pubkey.toString()}</p>
               <p>
                   Balance: {" "}
                   {(
                       campaign.amountDonated/web3.LAMPORTS_PER_SOL
                   ).toString()}
               </p>
               <p>{campaign.name}</p>
               <p>{campaign.description}</p>
               <button onClick = {() => {donate(campaign.pubkey)} } > Click to Donate </button>
               
           </div>
       ))}
        </div>
        )

        const renderConnectedContainer = () => ( < button onClick = { createCampaign } > Create a campaign </button>)

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
                    {walletAddress && renderConnectedContainer()}

                </div>
            )
        }

        export default App;