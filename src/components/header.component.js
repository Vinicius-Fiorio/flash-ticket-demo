import React, { useEffect, useState } from "react";
import './header.styled.css';
import { Link } from 'react-router-dom';

import controllerFirebase from '../controllerFirebase'

function Header(props){

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

    async function logout(){
        await controllerFirebase.signOut()
        props.onReceiveLogout()
    }

    useEffect(() => {

        async function getUserInfo(){
            const info = await controllerFirebase.getUserInfo(props.user.id)
            setUserInfo(info)
        }

        getUserInfo()
        
        
        // email: "vinicius.fiorioo@gmail.com",
        // name:"Vinicius Fiorio",
        // userUid:"b3f1wZlpVDbBpzMSG67JcQzUNRd2",
        // wallet: {
        //     address: "abc",
        //     phrase: "24 words",
        //     privateKey: "123",
        //     publicKey: "p123"
        // }
        
    }, [props.user]);

    return (
        <>
            <header >
                <div className="logo">
                    <Link to={'/tickets'} ><p>Meus Ingressos</p></Link>
                </div>
                <nav className="options">
                    <p className="walletAddress">💳 {userInfo.wallet.address}</p>
                    <p><Link to={'/mint'} >Cunhagem Ingresso</Link></p>
                    <p className="sair" onClick={logout}>Sair</p>
                </nav>
            </header>
        </>
    )
}

export default Header;