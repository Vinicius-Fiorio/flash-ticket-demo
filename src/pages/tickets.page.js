import React, { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import './tickets.page.styled.css';

import controllerFirebase from '../controllerFirebase'

function TicketPage(props){

    const [tickets,setTickets] = useState();
    const [loading, setLoad] = useState(false)

    // const [userInfo, setUserInfo] = useState({
    //     email: "",
    //     name: "",
    //     userUid: "",
    //     wallet: {
    //         index: "",
    //         address: "",
    //         phrase: "",
    //         privateKey: "",
    //         publicKey: ""
    //     }
    // })

    useEffect(() => {

        const settings = {
            apiKey: "SwyOoNq0tESJxnf4CEam1CGyK1Or_mGZ",
            network: Network.MATIC_MUMBAI, 
        };

        const alchemy = new Alchemy(settings);

        setLoad(true)
        async function getNftsFromUser(){
            let ingressos = []
            //address contract 0xAc4F4FDefB5665b9477b19C335aE12F39f5d591E
            const info = await controllerFirebase.getUserInfo(props.user.id)
            // setUserInfo(info)

            console.log(info.wallet.address)
            const nfts = await alchemy.nft.getNftsForOwner(info.wallet.address);
            console.log(nfts.ownedNfts)

            if (nfts.ownedNfts.length > 0){
                for (let index = 0; index < nfts.ownedNfts.length; index++) {
                    if (nfts.ownedNfts[index].contract.address.toLocaleLowerCase() === ("0xAc4F4FDefB5665b9477b19C335aE12F39f5d591E").toLocaleLowerCase()){
                        ingressos.push(nfts.ownedNfts[index])
                    }
                }
    
                setTickets(ingressos)
            }
            setLoad(false)
        }
        
        getNftsFromUser()
        
    },[props.user])


    if (tickets === undefined){
        return (
            <>
                <div className="container">
                    <div className="title">
                        <h1>Seus Ingressos NFTs</h1>
                    </div>
                    {
                        loading ? 
                        <div className="non-tickets">
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>

                        :

                        <div className="non-tickets">
                            <p>Você ainda não possui ingressos...</p>
                        </div>
                    }
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container">
                <div className="title">
                    <h1>Seus Ingressos NFTs</h1>
                </div>
                <div className="tickets" >
                {
                    tickets.map((ticket,index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="imgCard" src={ticket.rawMetadata.image} alt="Avatar"/>
                                <div className="container-card">
                                    <h4><b>{ticket.rawMetadata.name}</b></h4> 
                                    <div className="container-explorer">
                                    <a className="explorerBlockchain" href={`https://mumbai.polygonscan.com/token/0xac4f4fdefb5665b9477b19c335ae12f39f5d591e?a=${ticket.tokenId}`} target="_blank" rel="noopener noreferrer">Ver na blockchain</a> 
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        </>
    );
}

export default TicketPage