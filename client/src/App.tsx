import React from 'react';
import {Map} from './Components/Map/Map'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import Particle from './Components/Particle';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Particle/>}/>
                <Route path="/maps" element={<Map/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
