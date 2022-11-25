import React, {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';

export const SimpleMap = () => {
  const [currentLocation, setCurrentLocation] = useState();

  const success = (pos) => {
    const crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }


  useEffect(() => {
    setCurrentLocation(navigator.geolocation.getCurrentPosition(success));
  }, [])
  
  const defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: {lat: 45.760696, lng: 21.226788}
  };

  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyCX7DVZTuz23vmFeYrdhw55kD-j_d8U_uo"}} // set if you need stats etc ...
          center={[45.760696, 21.226788]}
          zoom={9}>
      </GoogleMap>
    </div>
  );
}