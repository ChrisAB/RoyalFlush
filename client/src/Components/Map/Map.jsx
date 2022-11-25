import React, {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import {Marker} from "./Marker";

export const SimpleMap = () => {
  const [currentLocation, setCurrentLocation] = useState();

  const success = (pos) => {
    setCurrentLocation(pos.coords);
    console.log(currentLocation);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])
  
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
          center={[45.760696, 21.226788]}
          zoom={9}>
        <Marker lat={45.760696} lng={21.226788}/>
      </GoogleMap>
    </div>
  );
}
