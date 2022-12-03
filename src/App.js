import './App.css';
import Header from './components/header.component'
import Footer from './components/footer.component'

import { BrowserRouter } from 'react-router-dom'
import RoutePages from './routes/routes'
import React, { useState } from 'react';
import LoginPage from './pages/login.page';

import controllerFirebase from './controllerFirebase'

function App() {
  const [user,setUser] = useState(null)

  async function loginUserAuth(userResult){
    let userInfo = {
      id: userResult.uid,
      name: userResult.displayName,
      email: userResult.email
    }
    await controllerFirebase.createAddresWallet(userInfo)
    setUser(userInfo)
  }

  function logout(){
    setUser(null)
  }

  if (user === null){
    return (

      <LoginPage onReceiveGoogle={loginUserAuth}/>

    );
  }

  return (
    <BrowserRouter>
      <Header onReceiveLogout={logout} user={user}/>

      <RoutePages user={user}/>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
