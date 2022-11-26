import React, {useState, useEffect} from "react";
import GoogleMap from 'google-map-react';
import {LocationIcon} from "../Markers/LocationIcon";
import {ParkingIcon} from "../Markers/ParkingIcon";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SpotDetails} from '../SpotDetails/SpotDetails';



export const Map = (props) => {
  const {parkingSpots} = props;
  const [currentLocation, setCurrentLocation] = useState({lat: 45.760696, lng: 21.226788});

  const success = (pos) => {
    setCurrentLocation(pos.coords);
    console.log(currentLocation);
  }

  useEffect(() => {
  navigator.geolocation?.getCurrentPosition((position) => {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }; 
    setCurrentLocation(pos)     
  })
//navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(parkingSpots);
  
  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 45.760696, lng: 21.226788}
  };
  // console.log(currentLocation);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={8} style={{ height: '100vh', width: '100%' }}>
          <GoogleMap
              bootstrapURLKeys={{key: "AIzaSyCX7DVZTuz23vmFeYrdhw55kD-j_d8U_uo"}}
              center={[currentLocation?.lat, currentLocation?.lng]}
              zoom={15}>
            <LocationIcon lat={currentLocation?.lat} lng={currentLocation?.lng}  />
            {
              parkingSpots.map((ps) => {
                console.log("aici");
                // <ParkingIcon lat={45.790698} lng={21.226782} freeSpots ={ps.numberOfFreeSpots} />
                return <ParkingIcon lat={ps.coordinates.lat} lng={ps.coordinates.lng} freeSpots={ps.numberOfFreeSpots} parkingCategory={ps.parkingCategory}/>
              })
            }
            {/* <ParkingIcon lat={45.790698} lng={21.226782} freeSpots = {parkingSpots[0].numberOfFreeSpots} /> */}
            <ParkingIcon lat={45.760200} lng={21.226765}  freeSpots={51} />
          </GoogleMap>
        </Grid>
        <Grid item xs={12} md={4} style={{ height: '100vh' }}>
          <SpotDetails />
        </Grid>
      </Grid>
    </Box>
  );
}
