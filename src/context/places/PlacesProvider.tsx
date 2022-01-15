import { useEffect, useReducer } from 'react';
import { searchApi } from '../../apis';
import { getUserLocation } from '../../helpers';
import { Feature, PlacesResponse } from '../../interfaces/places';
import { PlacesReducer } from './PlacerReducer';
import { PlacesContext } from './PlacesContext';

export interface PlaceState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlaceState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);
    useEffect(() => {
        getUserLocation().then((cords) => {
            dispatch({ type: 'setUserLocation', payload: cords });
        });
    }, []);

    const searchPlacesByTerm = async (term: string): Promise<Feature[]> => {
        if (term.length === 0){
            dispatch({ type: 'setPlaces', payload: [] });
            return [];
        }
        if (!state.userLocation)
            throw new Error('No hay ubicación del usuario');

        dispatch({ type: 'setLoadingPlaces' });

        const resp = await searchApi.get<PlacesResponse>(`/${term}.json`, {
            params: {
                proximity: state.userLocation.join(','),
            },
        });
        dispatch({ type: 'setPlaces', payload: resp.data.features });

        return resp.data.features;
    };
    return (
        <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
            {children}
        </PlacesContext.Provider>
    );
};
