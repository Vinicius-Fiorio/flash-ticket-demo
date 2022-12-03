import React from "react";
import { Routes, Route } from 'react-router-dom';
import MintPage from "../pages/mint.page";
import TicketPage from "../pages/tickets.page";

export default function RoutePages(props){

    return (
        <Routes>
            <Route path="/tickets" element={<TicketPage user={props.user}/>}/>

            <Route path="/" element={<MintPage user={props.user}/>}/>
            <Route path="/mint" element={<MintPage user={props.user}/>}/>
        </Routes>
    );
}