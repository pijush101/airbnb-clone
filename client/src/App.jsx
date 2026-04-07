import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import UserProvider, { UserContext } from './providers/UserProvider';
import PlaceProvider from './providers/PlaceProvider';

import Layout from './component/ui/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlacePage from './pages/PlacePage';
import PlacesForm from './pages/PlacesForm';
import SingleBookedPlace from './pages/SingleBookedPlace';
import NotFoundPage from './pages/NotFoundPage';

// Protected route wrapper
function ProtectedRoute({ children }) {
    const { user, ready } = useContext(UserContext);
    if (!ready) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/place/:id" element={<PlacePage />} />
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account/bookings"
                    element={
                        <ProtectedRoute>
                            <ProfilePage tab="bookings" />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account/bookings/:id"
                    element={
                        <ProtectedRoute>
                            <SingleBookedPlace />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account/places"
                    element={
                        <ProtectedRoute>
                            <ProfilePage tab="places" />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account/places/new"
                    element={
                        <ProtectedRoute>
                            <PlacesForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account/places/:id"
                    element={
                        <ProtectedRoute>
                            <PlacesForm />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <PlaceProvider>
                    <AppRoutes />
                </PlaceProvider>
            </UserProvider>
        </BrowserRouter>
    );
}
