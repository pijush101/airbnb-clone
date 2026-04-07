import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks';
import axioInstance from '../../api/axios';

const BookingWidget = ({ place }) => {
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [bookingData, setBookingData] = useState({
        noOfGuests: 1,
        name: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useAuth();

    const { noOfGuests, name, phone } = bookingData;
    const { _id: id, price } = place;

    useEffect(() => {
        if (user) {
            setBookingData((prev) => ({
                ...prev,
                name: user.name,
            }));
        }
    }, [user]);

    const numberOfNights =
        dateRange.from && dateRange.to
            ? differenceInCalendarDays(
                new Date(dateRange.to).setHours(0, 0, 0, 0),
                new Date(dateRange.from).setHours(0, 0, 0, 0)
            )
            : 0;

    const totalPrice = numberOfNights * price;

    // handle input changes for booking form fields
    const handleInputChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    // handle booking submission
    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');

        if (!user) {
            return setRedirect('/login');
        }

        // booking data validation
        if (numberOfNights < 1) {
            return toast.error('Please select at least one night');
        } else if (noOfGuests < 1) {
            return toast.error('No. of guests must be at least 1');
        } else if (noOfGuests > place.maxGuests) {
            return toast.error(`Allowed max. no. of guests: ${place.maxGuests}`);
        } else if (name.trim() === '') {
            return toast.error("Name can't be empty");
        } else if (phone.trim() === '') {
            return toast.error("Phone number can't be empty");
        }

        try {
            setLoading(true);
            const response = await axioInstance.post('/bookings', {
                place: id,
                checkIn: dateRange.from,
                checkOut: dateRange.to,
                noOfGuests,
                name,
                phone,
                price: totalPrice,
            });

            if (response.data.success) {
                toast.success('Booking successful');
                setRedirect(`/account/bookings/${response.data.booking._id}`);
            }
        } catch (err) {
            setError('Booking failed. Please try again.');
            toast.error('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
            <div className="flex items-baseline gap-1 mb-5">
                <span className="text-2xl font-bold text-gray-900">${place?.price}</span>
                <span className="text-gray-500">/ night</span>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleBooking} className="space-y-3">
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200">
                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                        <div className="p-3">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Check-in</label>
                            <input
                                type="date"
                                value={dateRange.from}
                                onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full text-sm text-gray-700 outline-none" />
                        </div>
                        <div className="p-3">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Check-out</label>
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
                                min={dateRange.from || new Date().toISOString().split('T')[0]}
                                className="w-full text-sm text-gray-700 outline-none" />
                        </div>
                    </div>
                    <div className="p-3">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Guests</label>
                        <input
                            type="number"
                            name="noOfGuests"
                            value={noOfGuests}
                            onChange={handleInputChange}
                            min={1}
                            max={place?.maxGuests || 10}
                            className="w-full text-sm text-gray-700 outline-none" />
                    </div>
                </div>

                {numberOfNights > 0 && (
                    <div className="space-y-3 pt-2">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 000-0000"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                                required />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-rose-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Booking...' : numberOfNights > 0 ? `Reserve – $${totalPrice}` : 'Check availability'}
                </button>
            </form>

            {numberOfNights > 0 && (
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>${place?.price} × {numberOfNights} nights</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingWidget;
