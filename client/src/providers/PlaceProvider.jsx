import { createContext, useState } from 'react';

export const PlaceContext = createContext(null);

export default function PlaceProvider({ children }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <PlaceContext.Provider value={{ places, setPlaces, loading, setLoading }}>
            {children}
        </PlaceContext.Provider>
    );
}
