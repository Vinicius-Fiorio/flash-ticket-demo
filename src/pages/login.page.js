import React from "react";
import './login.page.styled.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IoFlashOutline } from "react-icons/io5";

import controllerFirebase from '../controllerFirebase'

function LoginPage({onReceiveGoogle}){

    async function loginWithGoogle(e){
        e.preventDefault()
        const result = await controllerFirebase.authGoogle()
            
        if (result){
            onReceiveGoogle(result.user);
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={
                    <div className="container-login">
                        <div className="form">
                            {
                                <form>
                                    <div className="Icon">
                                        <IoFlashOutline fontSize={"100px"}/>
                                    </div>
                                    
                                    <p className="title">Flash Ticket</p>
                                    <p className="title sub">Acesse com sua conta:</p>
                                    
                                    <div className="methodsLogin">
                                        <input type={"button"} value="Entrar com Google" onClick={loginWithGoogle} className="googleButton"></input>
                                    </div>
                                </form>
                            }
                            
                        </div>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default LoginPage