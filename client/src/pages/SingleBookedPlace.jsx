import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMyBookings } from '../api';

function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
}

function differenceInDays(a, b) {
    if (!a || !b) return 0;
    return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
}

export default function SingleBookedPlace() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getMyBookings()
            .then(bookings => {
                const found = bookings.find(b => b._id === id);
                if (found) setBooking(found);
                else setError('Booking not found.');
            })
            .catch(() => setError('Could not load booking.'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <div className="spinner" />
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
                <h2 style={{ fontSize: 22, marginBottom: 8 }}>{error || 'Booking not found'}</h2>
                <Link to="/account/bookings" style={{ color: '#FF385C', fontWeight: 600 }}>Back to trips</Link>
            </div>
        );
    }

    const place = booking.place || {};
    const photo = place.photos?.[0];
    const nights = differenceInDays(booking.checkIn, booking.checkout);

    return (
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 700 }}>
            {/* Back */}
            <Link to="/account/bookings" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#222', fontWeight: 500, marginBottom: 24, textDecoration: 'none', fontSize: 14 }}>
                ← Your trips
            </Link>

            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{place.title || 'Your booking'}</h1>
            <p style={{ color: '#717171', marginBottom: 24 }}>{place.address}</p>

            {/* Photo */}
            {photo && (
                <img
                    src={photo}
                    alt={place.title}
                    style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 16, marginBottom: 32 }}
                />
            )}

            {/* Booking summary card */}
            <div style={{ border: '1px solid #ddd', borderRadius: 16, overflow: 'hidden', marginBottom: 28 }}>
                {/* Header */}
                <div style={{ background: '#FF385C', color: 'white', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 28 }}>✅</span>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>Booking confirmed</p>
                            <p style={{ fontSize: 13, opacity: 0.85, margin: 0 }}>Booking ID: {booking._id}</p>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div style={{ padding: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div style={{ padding: 16, background: '#f7f7f7', borderRadius: 10 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#717171', marginBottom: 4 }}>CHECK-IN</p>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>{formatDate(booking.checkIn)}</p>
                        </div>
                        <div style={{ padding: 16, background: '#f7f7f7', borderRadius: 10 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#717171', marginBottom: 4 }}>CHECK-OUT</p>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>{formatDate(booking.checkout)}</p>
                        </div>
                        <div style={{ padding: 16, background: '#f7f7f7', borderRadius: 10 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#717171', marginBottom: 4 }}>GUESTS</p>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>{booking.numOfGuests} guests</p>
                        </div>
                        <div style={{ padding: 16, background: '#f7f7f7', borderRadius: 10 }}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#717171', marginBottom: 4 }}>DURATION</p>
                            <p style={{ fontWeight: 600, fontSize: 15 }}>{nights} night{nights !== 1 ? 's' : ''}</p>
                        </div>
                    </div>

                    {/* Price breakdown */}
                    <div style={{ marginTop: 24, borderTop: '1px solid #ddd', paddingTop: 20 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Price breakdown</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#484848', marginBottom: 8 }}>
                            <span>₹{(place.price || 0).toLocaleString()} × {nights} nights</span>
                            <span>₹{((place.price || 0) * nights).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, borderTop: '1px solid #ddd', paddingTop: 16 }}>
                            <span>Total charged</span>
                            <span>₹{(booking.price || 0).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Guest name */}
                    <div style={{ marginTop: 20, borderTop: '1px solid #ddd', paddingTop: 20 }}>
                        <p style={{ fontSize: 14, color: '#717171' }}>
                            Booked by: <strong style={{ color: '#222' }}>{booking.name}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <Link to="/account/bookings" className="btn-outline" style={{ borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>
                ← Back to my trips
            </Link>
        </div>
    );
}
