import React, { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import './tickets.page.styled.css';

import controllerFirebase from '../controllerFirebase'

function TicketPage(props){

    const [tickets,setTickets] = useState();
    const [loading, setLoad] = useState(false)
    const [loadingTicket, setLoadTicket] = useState(false)

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
    async function Test(){
        setLoadTicket(!loadingTicket)
    }
    

    useEffect(() => {
        let ingressos = []
        const settings = {
            apiKey: "SwyOoNq0tESJxnf4CEam1CGyK1Or_mGZ",
            network: Network.MATIC_MUMBAI, 
        };

        const alchemy = new Alchemy(settings);

        setLoad(true)
        
        async function getNftsFromUser(){
            //address contract 0xAc4F4FDefB5665b9477b19C335aE12F39f5d591E
            const info = await controllerFirebase.getUserInfo(props.user.id)
            // setUserInfo(info)

            console.log(info.wallet.address)
            const nfts = await alchemy.nft.getNftsForOwner(info.wallet.address);
            // console.log(nfts.ownedNfts)

            if (nfts.ownedNfts.length > 0){
                for (let index = 0; index < nfts.ownedNfts.length; index++) {
                    if (nfts.ownedNfts[index].contract.address.toLocaleLowerCase() === ("0xE04fF517f1f15f1569Db7f6DB616c582D0162E85").toLocaleLowerCase()){
                        ingressos.push(nfts.ownedNfts[index])
                    }
                }
            }

            setLoad(false)
            setTickets(ingressos)
        }
        setTickets(ingressos)
        
        getNftsFromUser()
    },[loadingTicket])

    // console.log(tickets)

    if (tickets === undefined || tickets.length === 0){
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
                    <div className="reloadSection">
                        <input className="buttonReload" type="button" value="Atualizar Ingressos" onClick={Test}/>
                    </div>
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
                                    <h4 className="nameNft">{ticket.rawMetadata.name}</h4> 
                                    <div className="container-explorer">
                                        <a className="explorerBlockchain" href={`https://mumbai.polygonscan.com/token/0xe04ff517f1f15f1569db7f6db616c582d0162e85?a=${ticket.tokenId}`} target="_blank" rel="noopener noreferrer">Ver na blockchain</a> 
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
                <div className="reloadSection">
                    <div onClick={Test}>
                        <span className="buttonReload">Atualizar Ingressos</span>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default TicketPage