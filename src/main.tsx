import React from 'react';
import ReactDOM from 'react-dom';

import mapboxgl from 'mapbox-gl';

/* mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ; */
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmNociIsImEiOiJja3YwZWpiMjU2NHI1MnZ0NHk5dHAzM2p3In0.GtdxNI1P38642yIvBOvtNA';


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
