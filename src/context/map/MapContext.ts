import {Map} from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProps{
        isMapReady: boolean;
        map?:Map

        //methods
        setMap: (map:Map) => void;
        getRouteBetweenPoints:(start: [number, number], end:[number, number])=>void;
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);