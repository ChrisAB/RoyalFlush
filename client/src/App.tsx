import React, {useState, useEffect} from "react";
import {MapContainer} from './Components/MapContainer/MapContainer'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import Particle from './Components/Particle';
import { fetchParkingAreas, fetchParkingSpots } from './Api';
import { AxiosResponse } from "axios";

export interface parkingAreaSchema {
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

// const parkingTest : parkingAreaSchema = {
//   coordinates: {lat: "45.790698", lng: "21.226782"},
//   name: "Parking1",
//   totalNumberOfSpots: 4,
//   numberOfFreeSpots: 2,
//   parkingCategory: "green",
//   indentificationNumber: "1"
// }

// const parkingAreas : parkingAreaSchema[] = [parkingTest];
const App = () => {
  const [parkingAreas, setParkingAreas] = useState<parkingAreaSchema[]>();
  
  useEffect (() => {
    fetchParkingAreas()
    .then((res) => setParkingAreas(res.data))
    .catch((err) => console.log(err));
  }, []);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Particle/>}/>
              <Route path="/maps" element={<MapContainer parkingAreas = {parkingAreas} />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
