import React, { useState, useEffect } from "react";
import './mint.page.styled.css'

import { TatumPolygonSDK } from '@tatumio/polygon'
import tantumConfig from '../tantumConfig'
import controllerFirebase from '../controllerFirebase'

const MintPage = (props) =>{
    const polygonSDK = TatumPolygonSDK({apiKey: tantumConfig.apiKey})

    const [loading, setLoad] = useState(false)
    const [error, setError] = useState(null)
    const [sucess, setSucess] = useState(null)
    const [userInfo, setUserInfo] = useState({
        email: "",
        name: "",
        userUid: "",
        wallet: {
            index: "",
            address: "",
            phrase: "",
            privateKey: "",
            publicKey: ""
        }
    })

    useEffect(() => {
        async function getUserInfo(){
            const info = await controllerFirebase.getUserInfo(props.user.id)
            setUserInfo(info)
        }

        getUserInfo()
        
    }, [props.user]);

    async function mintTicket(){
        setLoad(true)
        try {
            const mint = await polygonSDK.api.polygonBlockchainSmartContractInvocation({
                contractAddress: '0xE04fF517f1f15f1569Db7f6DB616c582D0162E85',
                methodName: 'safeMint',
                methodABI: {
                    "inputs": [
                        {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                        }
                    ],
                    "name": "safeMint",
                    "outputs": [
                        
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                params: [userInfo.wallet.address],
                fromPrivateKey: tantumConfig.addressOwnerContract,
            })
            
            
            console.log(mint)
            setSucess("Ingresso Resgatado com Sucesso!")
            setLoad(false)

            const timer = setTimeout(() => {
                setSucess(null)
            }, 6000);
            return () => clearTimeout(timer);
            
        } catch (e) {
            console.log({e});
            setError(e.body.message)
            
            setLoad(false)

            const timer = setTimeout(() => {
                setError(null)
            }, 6000);
            return () => clearTimeout(timer);
        }
    }

    return (
        
        <div className="container-mint">
            <div className="foto">
                <img src="https://i.imgur.com/LvnEOFq.jpeg" alt="Imagem de um ingresso" width={"400px"}></img>
            </div>
            {loading ? 
                <div className="info">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            : 
                <div className="info">
                    <h1>Ingresso NFT</h1>
                    <h3>
                    Essa coleção de ingressos NFTs tem como objetivo mostrar o funcionamento do sistema de wallets custodiadas,onde temos o cuidado de integrar usuários que não tem nenhum conhecimento prévio aos serviços da web 3.0
                    </h3>

                    {
                        error != null ? 
                        <p className="messageError">{error}</p>
                        :
                        <></>
                    }
                    {
                        sucess != null ? 
                        <p className="messageSucess">{sucess}</p>
                        :
                        <></>
                    }
                    <button onClick={mintTicket} >Resgatar Ingresso</button>
                </div>
            }
        </div>
    );
}

export default MintPage