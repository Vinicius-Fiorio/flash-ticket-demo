import React from "react";
import './login.page.styled.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import controllerFirebase from '../controllerFirebase'

function LoginPage({onReceiveGoogle}){

    async function loginWithGoogle(e){
        e.preventDefault()
        const result = await controllerFirebase.authGoogle()
            
        if (result){
            onReceiveGoogle(result.user);
        }
    }

    // async function loginWithEmailAndPass(e){
    //     e.preventDefault()

    //     setLoad(true)
    //     if (password.length >= 6 && email.includes('@')){
    //         const result = null
    //         try {
    //             result = await controllerFirebase.loginAccount(email,password)
    //         } catch (error) {
    //             console.log("Ruim...")
    //         }
            
            
    //         if (result){
    //             setLoad(false)
    //             onReceiveGoogle(result.user);
    //         }
    //     }
    //     setMessageInfo("Email e/ou senha inválidos!")
    //     setLoad(false)
    //     const timer = setTimeout(() => {
    //         setMessageInfo(null)
    //     }, 6000);
    //     return () => clearTimeout(timer);
    // }

    // async function registerWithEmailAndPass(e){
    //     e.preventDefault()
    //     setLoad(true)
    //     if (password && email){
    //         if (password.length >= 6 && email.includes('@')){
    //             const result = await controllerFirebase.createAccount(email,password)
                
    //             if (result){
    //                 setLoad(false)
    //                 onReceiveGoogle(result.user);
    //             }
                
    //         }
    //     }
    //     setMessageInfo("Insira um email válido; Senha precisa conter 6 caracteres")
    //     setLoad(false)

    //     const timer = setTimeout(() => {
    //         setMessageInfo(null)
    //     }, 6000);
    //     return () => clearTimeout(timer);
        
    // }

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/register" element={
                    <div className="container-login">
                        <div className="form-register">
                            {
                                loading ?
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                :
                                <form>
                                    <p className="title">Crie uma Conta!</p>
                                    {
                                        messageInfo != null ? 
                                        <p className="messageInfo">{messageInfo}</p>
                                        :
                                        <></>
                                    }
                                    <div className="campos">
                                        <p>E-mail</p>
                                        <input type={'text'} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="campos">
                                        <p>Senha</p>
                                        <input type={'password'} onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                    <input type={"button"} onClick={registerWithEmailAndPass} value="Cadastrar" />
                                    <h6>Já tem uma conta? <Link to={'/login'} className="registerText"><span>Entrar</span></Link></h6>
                                </form>
                            }
                        </div>
                    </div>
                }/> */}

                <Route path="*" element={
                    <div className="container-login">
                        <div className="form">
                            {
                                <form>
                                    <p className="title">Flash Ticket ⚡</p>
                                    <p className="title">Faça login para acessar</p>
                                    {/* <div className="campos">
                                        <p>E-mail</p>
                                        <input type={'text'} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="campos">
                                        <p>Senha</p>
                                        <input type={'password'} onChange={(e) => setPassword(e.target.value)}></input>
                                    </div> */}
                                    
                                    
                                    <div className="methodsLogin">
                                        {/* <input type={"button"} value="Entrar" onClick={loginWithEmailAndPass} className="loginButton"></input>
                                        <h6>Não tem uma conta? <span><Link to="/register" className="registerText">Registre-se</Link></span></h6>
                                        <h5>OU</h5> */}
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