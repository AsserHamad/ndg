import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"

function MyMapComponent() {
    return(
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: 30.060352, lng: 31.190823}}
        >
            <Marker position={{ lat: 30.060352, lng: 31.190823 }}  />  
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MyMapComponent));

export default WrappedMap;