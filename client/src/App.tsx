import React from 'react';
import { Map } from './Components/Map/Map'

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
    <div>
      <Map parkingSpots = {parkingSpots} />
    </div>
  );
}

export default App;
