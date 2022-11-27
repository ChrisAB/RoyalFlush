import React, {useState, useEffect} from "react";
import GoogleMap from 'google-map-react';
import {Marker} from "react-google-maps";
import {LocationIcon} from "../Markers/LocationIcon";
import {ParkingIcon} from "../Markers/ParkingIcon";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SpotDetails} from '../SpotDetails/SpotDetails';



export const Map = (props) => {
  const {currentLocation, parkingAreas, setCurrentSpot, currentSpot, getParkingSpots} = props;

  return  <GoogleMap
    bootstrapURLKeys={{key: "AIzaSyCX7DVZTuz23vmFeYrdhw55kD-j_d8U_uo"}}
    center={[currentLocation?.lat, currentLocation?.lng]}
    zoom={15}>
    <LocationIcon lat={currentLocation?.lat} lng={currentLocation?.lng} /> 
    {
      parkingAreas?.map((ps) => {

        return <Marker key={ps._id} lat={ps.coordinates.lat} lng={ps.coordinates.long} >
          <IconButton onClick={() => {setCurrentSpot(ps); getParkingSpots(ps._id)} }>
            <ParkingIcon freeSpots={ps.numberOfFreeSpots} parkingSpots={ps}/>
          </IconButton>
        </Marker>
      })
    }

  </GoogleMap>
}
