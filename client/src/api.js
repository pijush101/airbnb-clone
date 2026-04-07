// Centralized API service — all calls go through here
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(method, path, body = null, isFormData = false) {
    const options = {
        method,
        credentials: 'include', // send cookies
        headers: {},
    };

    if (body) {
        if (isFormData) {
            options.body = body;
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

// ── Auth ──────────────────────────────────────────────────────
export const registerUser = (name, email, password) =>
    request('POST', '/user/register', { name, email, password });

export const loginUser = (email, password) =>
    request('POST', '/user/login', { email, password });

export const logoutUser = () =>
    request('GET', '/user/logout');

export const updateUser = (data) =>
    request('PUT', '/user/update-user', data);

// ── Places ────────────────────────────────────────────────────
export const getAllPlaces = () =>
    request('GET', '/place/get-places');

export const getMyPlaces = () =>
    request('GET', '/place/user-places');

export const getSinglePlace = (id) =>
    request('GET', `/place/single-place/${id}`);

export const searchPlaces = (key) =>
    request('GET', `/place/search-places/${key}`);

export const addPlace = (data) =>
    request('POST', '/place/add-place', data);

export const updatePlace = (data) =>
    request('PUT', '/place/update-place', data);

export const uploadByLink = (link) =>
    request('POST', '/upload-by-link', { link });

// ── Bookings ──────────────────────────────────────────────────
export const createBooking = (data) =>
    request('POST', '/booking/create-booking', data);

export const getMyBookings = () =>
    request('GET', '/booking/user-bookings');
