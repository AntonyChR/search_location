import { Feature } from "../../interfaces/places";
import { PlaceState } from "./PlacesProvider";

type PlacesAction =
    { type: "setUserLocation",  payload: [number, number] } | 
    { type: "setPlaces",        payload: Feature[] } |
    { type: "setLoadingPlaces"}

export const PlacesReducer = (state: PlaceState, action: PlacesAction): PlaceState => {
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPlaces':
            return{
                ...state,
                isLoadingPlaces: true,
                places: []
            }
        case 'setPlaces':
            return{
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }
        default:
            return state;
    }
}
