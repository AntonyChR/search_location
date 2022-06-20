import React from 'react';
import ReactDOM from 'react-dom';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}` ;


import { MapsApp } from './MapsApp';
if (!navigator.geolocation) {
    alert('No se puede acceder a la geolocalización');
    throw new Error('No se puede acceder a la geolocalización');
}

ReactDOM.render(
    <React.StrictMode>
        <MapsApp />
    </React.StrictMode>,
    document.getElementById('root')
);
