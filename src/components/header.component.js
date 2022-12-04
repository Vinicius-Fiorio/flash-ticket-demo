import React, { createRef, useEffect, useState } from "react";
import './header.styled.css';
import { Link } from 'react-router-dom';
import { IoFlashOutline } from "react-icons/io5";

import controllerFirebase from '../controllerFirebase'

function Header(props){

    const mobileMenu = createRef()
    const navList = createRef()

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
    const [wallet,setWallet] = useState("")

    async function logout(){
        await controllerFirebase.signOut()
        props.onReceiveLogout()
    }

    useEffect(() => {

        async function getUserInfo(){
            const info = await controllerFirebase.getUserInfo(props.user.id)
            setUserInfo(info)
            setWallet(info.wallet.address.substring(0,4) + "..." + info.wallet.address.substring(info.wallet.address.length - 4, info.wallet.address.length))
        }

        getUserInfo()
        
        
    }, [props.user]);

    const [active,setActive] = useState(false)
    const [count,setCount] = useState(0)

    function visibleMenu(){
        setActive(!active)
        setCount((prv) => prv + 1)
    }

    useEffect(() => {
        if (active || count%2 == 0){
            mobileMenu.current.classList.add("active");
            navList.current.classList.add("active");

            let teste = document.querySelectorAll(".nav-list li")
                teste.forEach((link, index) => {
                    link.style.animation
                    ? (link.style.animation = "")
                    : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
                });
        }
        if(!active){
            mobileMenu.current.classList.remove("active");
            navList.current.classList.remove("active");
        }
        
    });


    return (
        <>
            <div className="header">
                <nav>
                    <div className="logo">
                        <IoFlashOutline fontSize={"40px"} color="#ffffff"/>
                        <span>FlashTicket</span>
                    </div>
                    
                    <div className="mobile-menu" onClick={visibleMenu} ref={mobileMenu}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <ul className="nav-list" ref={navList}>
                        <li> <p>{wallet}</p></li>
                        <li><Link to={'/tickets'} className="linkto">Meus ingressos</Link></li>
                        <li><Link to={'/mint'} className="linkto">Resgatar ingresso</Link></li>
                        <li onClick={logout}><p>Sair</p></li>
                    </ul>
                </nav>
                
                {/* <div className="logo">
                    <Link to={'/tickets'} ><p>Meus Ingressos</p></Link>
                </div>
                <nav className="options">
                    <p className="walletAddress">💳 {userInfo.wallet.address}</p>
                    <p><Link to={'/mint'} >Cunhagem Ingresso</Link></p>
                    <p className="sair" onClick={logout}>Sair</p>
                </nav> */}
            </div>
        </>
    )
}

export default Header;