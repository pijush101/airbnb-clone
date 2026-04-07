import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // On mount, try to restore session from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('airbnb_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (_) {
                localStorage.removeItem('airbnb_user');
            }
        }
        setReady(true);
    }, []);

    // Keep localStorage in sync whenever user changes
    const saveUser = (userData) => {
        if (userData) {
            localStorage.setItem('airbnb_user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('airbnb_user');
        }
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, setUser: saveUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
