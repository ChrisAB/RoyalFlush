import React, {useState, useEffect} from "react";
import GoogleMap from 'google-map-react';
import {LocationIcon} from "../Markers/LocationIcon";


export const Map = () => {
  const [currentLocation, setCurrentLocation] = useState({lat: 45.760696, lng: 21.226788});

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

  console.log(currentLocation);
  
  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 45.760696, lng: 21.226788}
  };
  // console.log(currentLocation);

  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyCX7DVZTuz23vmFeYrdhw55kD-j_d8U_uo"}}
          center={[currentLocation?.lat, currentLocation?.lng]}
          zoom={9}>
        <LocationIcon lat={45.760696} lng={21.226788}  />
      </GoogleMap>
    </div>
  );
}
