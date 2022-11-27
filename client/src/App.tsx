import React, {useState, useEffect} from "react";
import {MapContainer} from './Components/MapContainer/MapContainer'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Particle from './Components/LandingPage/Particle';
import { fetchParkingAreas, fetchAllParkingSpots } from './Api';

export interface parkingAreaSchema {
  coordinates: {
    lat: String;
    lng: String;
  };
  name: String;
  totalNumberOfSpots: Number;
  numberOfFreeSpots: Number;
  parkingCategory: String;
  indentificationNumber: String;
}

const App = () => {
  const [parkingAreas, setParkingAreas] = useState<parkingAreaSchema[]>();
  const [parkingSpots, setParkingSpots] = useState();

  const bodyStyle = document.body.style;

  useEffect(() => {
   bodyStyle.overflowY = "hidden";
  }, [])
 

  const getParkingSpots = () => {
    fetchAllParkingSpots()
      .then((res) => {setParkingSpots(res.data);})
      .catch((err) => console.log(err));
  };

  useEffect (() => {
    fetchParkingAreas()
    .then((res) => setParkingAreas(res.data))
    .catch((err) => console.log(err));
    getParkingSpots();
  }, []);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Particle/>}/>
              <Route path="/maps" element={<MapContainer parkingAreas = {parkingAreas} parkingSpots={parkingSpots}/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
