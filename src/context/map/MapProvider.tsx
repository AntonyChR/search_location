import { useContext, useEffect, useReducer } from 'react';

import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './MapReducer';
import { PlacesContext } from '..';
import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
};

interface Props {
    children: JSX.Element | JSX.Element[];
}
export const MapProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach((marker) => marker.remove());
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const popUp = new Popup().setHTML(
                ` <h6>${place.text_es}</h6>
                      <p>${place.place_name_es}</p>
                    `
            );
            const newMarker = new Marker()
                .setLngLat([lng, lat])
                .setPopup(popUp)
                .addTo(state.map!);

            newMarkers.push(newMarker);
        }

        dispatch({type: 'setMarkers', payload: newMarkers});
    }, [places]);

    const setMap = (map: Map) => {
        const myLocationPopUp = new Popup().setHTML('<h4>My Location</h4>');

        new Marker({color: 'red'})
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopUp)
            .addTo(map);
        dispatch({
            type: 'setMap',
            payload: map,
        });
    };

    const getRouteBetweenPoints = async (start: [number, number], end:[number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
        const {distance,duration, geometry}  = resp.data.routes[0];
        const {coordinates} = geometry;
        let kms = Math.round((distance / 1000)*100) / 100;
        let mins = Math.floor(duration / 60);
        console.log(kms, mins)

        const bounds = new LngLatBounds(start, end)

        for(const coord of coordinates){
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {padding: 200});

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties:{},
                    geometry: {
                        type: 'LineString',
                        coordinates,
                    },  
                }]
            }
        }

        if(state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3bb2d0',
                'line-width': 5,
                'line-opacity': 0.75,
            }   
        })

    }

    return (
        <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
            {children}
        </MapContext.Provider>
    );
};
