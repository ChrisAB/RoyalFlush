import React, {useState, useEffect} from "react";
import GoogleMap from 'google-map-react';
import {LocationIcon} from "../Markers/LocationIcon";
import {ParkingIcon} from "../Markers/ParkingIcon";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SpotDetails} from '../SpotDetails/SpotDetails';
import {Map} from "../Map/Map";
import image from "../SpotDetails/parking.jpg";
import {fetchParkingSpots} from "../../Api/index";

export const MapContainer = (props) => {
  const {parkingAreas, parkingSpots} = props;
  const [currentLocation, setCurrentLocation] = useState({lat: 45.760696, lng: 21.226788});
  const [currentSpot, setCurrentSpot] = useState("");

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

  const size = currentSpot ? 9: 12;

  
  // console.log(currentLocation);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={size} style={{ height: '100vh', width: '100%' }}>
            <Map 
              currentLocation={currentLocation} 
              parkingAreas={parkingAreas} 
              setCurrentSpot={setCurrentSpot} 
              currentSpot={currentSpot}
            />
        </Grid>
        <Grid container xs={12} md={3} style={{ height: '100vh'}} 
        // component={Box}
        // display={{ xs: "none", md: {display} }}
        spacing={1}
        direction="column"
        justifyContent="start"
        alignItems="center"
        >
          <SpotDetails spotDetails={currentSpot} parkingSpots={parkingSpots}/>
        </Grid>
      </Grid>
    </Box>
  );
}
