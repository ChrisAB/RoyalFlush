import React, {useState, useEffect} from "react";
import GoogleMap from 'google-map-react';
import {LocationIcon} from "../Markers/LocationIcon";
import {ParkingIcon} from "../Markers/ParkingIcon";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SpotDetails} from '../SpotDetails/SpotDetails';
import {Map} from "../Map/Map";

export const MapContainer = (props) => {
  const {parkingAreas} = props;
  const [currentLocation, setCurrentLocation] = useState({lat: 45.760696, lng: 21.226788});
  const [currentSpot, setCurrentSpot] = useState("");

  const success = (pos) => {
    setCurrentLocation(pos.coords);
    console.log(currentLocation);
  }

  useEffect(() => {
  navigator.geolocation?.getCurrentPosition((position) => {
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }; 
    setCurrentLocation(pos)     
  })
//navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(currentSpot);
  
  // console.log(currentLocation);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} style={{ height: '100vh', width: '100%' }}>
            <Map currentLocation={currentLocation} parkingAreas={parkingAreas} setCurrentSpot={setCurrentSpot} currentSpot={currentSpot}/>
        </Grid>
        <Grid container xs={12} md={3} style={{ height: '100vh' }} 
        // spacing={2}
        direction="column"
        justifyContent="start"
        alignItems="center"
        sx={{background: "gray"}}
        >
          <SpotDetails spotDetails={currentSpot} />
        </Grid>
      </Grid>
    </Box>
  );
}
