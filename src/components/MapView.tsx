import mapboxgl from "mapbox-gl"
import { useContext, useLayoutEffect, useRef } from "react"
import { Loading } from "."
import { MapContext, PlacesContext } from "../context"

export const MapView = () => {
    const {isLoading, userLocation} = useContext(PlacesContext)
    const {setMap}  = useContext(MapContext)
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(()=>{
        if(!isLoading){
            const map = new mapboxgl.Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/dark-v10',
                center: userLocation,
                zoom: 14
            });
            setMap(map);
        }
    },[isLoading])
    if(isLoading){
        return(<Loading/>)
    }
    return (
        <div ref={mapDiv} style={{
            backgroundColor: 'grey',
            height: '100vh',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw',
        }}>
            {userLocation?.join(',')}
        </div>
    )
}
