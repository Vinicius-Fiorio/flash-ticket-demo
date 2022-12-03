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
              contractAddress: '0xAc4F4FDefB5665b9477b19C335aE12F39f5d591E',
              methodName: 'publicMint',
              methodABI:   {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                  }
                ],
                "name": "publicMint",
                "outputs": [
                  
                ],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              params: [1],
              fromPrivateKey: userInfo.wallet.privateKey,
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
            if (e.body.message === "Returned error: execution reverted: Numero maximo de cunhagem: 5 p/ wallet, diminua a qunatidade"){
                setError("Execution reverted: Numero maximo de resgate: 5 p/ wallet")
            }else{
                setError(e.name + ": Ocorreu um erro ao resgatar ingresso, verifique se adicionou tokens em seu edereço")
            }
            
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

                    <i className="Obs">*Antes de poder resgatar seu ingresso <a href="https://faucet.polygon.technology" target={"_blank"} rel="noreferrer" className="linkItalic">Clique aqui</a> e cole seu endereço(no cabeçalho dessa página ao lado do ícone 💳) para inserir alguns tokens ficticios em sua carteira. <br />Espere a confirmação e resgate seu ingresso!</i>
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