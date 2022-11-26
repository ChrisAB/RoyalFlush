import React, {useState, useEffect} from "react";
import GoogleMap from 'google-map-react';
import {LocationIcon} from "../Markers/LocationIcon";
import {ParkingIcon} from "../Markers/ParkingIcon";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SpotDetails} from '../SpotDetails/SpotDetails';

export const Map = (props) => {
  const {currentLocation, parkingSpots} = props
  return  <GoogleMap
    bootstrapURLKeys={{key: "AIzaSyCX7DVZTuz23vmFeYrdhw55kD-j_d8U_uo"}}
    center={[currentLocation?.lat, currentLocation?.lng]}
    zoom={15}>
    <LocationIcon lat={currentLocation?.lat} lng={currentLocation?.lng}  
  />
    {
      parkingSpots?.map((ps) => {
        console.log("aici");
        // <ParkingIcon lat={45.790698} lng={21.226782} freeSpots ={ps.numberOfFreeSpots} />
        return <ParkingIcon lat={ps.coordinates.lat} lng={ps.coordinates.lng} freeSpots={ps.numberOfFreeSpots} parkingCategory={ps.parkingCategory}/>
      })
    }
  {/* <ParkingIcon lat={45.790698} lng={21.226782} freeSpots = {parkingSpots[0].numberOfFreeSpots} /> */}
  <ParkingIcon lat={45.760200} lng={21.226765}  freeSpots={51} />
  </GoogleMap>
}
