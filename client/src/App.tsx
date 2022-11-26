import React from 'react';
import {Map} from './Components/Map/Map'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import Particle from './Components/Particle';

export interface parkingSpotSchema {
  coordinates: {
    lat: String;
    lng: String;
  };
  name: String;
  totalNumberOfSpots: Number;
  numberOfFreeSpots: Number;
  parkingCategory: String;
  //positionFile: Buffer;
  indentificationNumber: String;
}

const parkingTest : parkingSpotSchema = {
  coordinates: {lat: "45.790698", lng: "21.226782"},
  name: "Parking1",
  totalNumberOfSpots: 4,
  numberOfFreeSpots: 2,
  parkingCategory: "green",
  indentificationNumber: "1"
}

const parkingSpots : parkingSpotSchema[] = [parkingTest];

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Particle/>}/>
                <Route path="/maps" element={<Map parkingSpots = {parkingSpots} />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
