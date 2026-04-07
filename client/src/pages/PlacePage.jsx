import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSinglePlace, createBooking } from '../api';
import { UserContext } from '../providers/UserProvider';

function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function differenceInDays(a, b) {
    if (!a || !b) return 0;
    const ms = new Date(b) - new Date(a);
    return Math.max(0, Math.round(ms / 86400000));
}

const PERK_ICONS = {
    wifi: '📶', parking: '🅿️', tv: '📺', pets: '🐾',
    radio: '📻', kitchen: '🍳', private_entrance: '🚪',
};

export default function PlacePage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    // Booking state
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSinglePlace(id)
            .then(data => setPlace(data.place))
            .catch(() => setError('Place not found.'))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleBook(e) {
        e.preventDefault();
        if (!user) { navigate('/login'); return; }
        setBookingError('');
        setBookingLoading(true);
        const nights = differenceInDays(checkIn, checkOut);
        const price = nights * (place.price || 0);
        try {
            await createBooking({
                place: place._id,
                checkIn, checkout: checkOut,
                numOfGuests: guests,
                name: user.name,
                phone: user.phone || '0000000000',
                price,
            });
            setBookingSuccess(true);
        } catch (err) {
            setBookingError(err.message || 'Booking failed.');
        } finally {
            setBookingLoading(false);
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <div className="spinner" />
            </div>
        );
    }

    if (error || !place) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
                <h2 style={{ fontSize: 24, marginBottom: 8 }}>{error || 'Place not found'}</h2>
            </div>
        );
    }

    const nights = differenceInDays(checkIn, checkOut);
    const totalPrice = nights * (place.price || 0);

    // All photos modal
    if (showAllPhotos) {
        return (
            <div style={{
                position: 'fixed', inset: 0, background: 'white', zIndex: 1000,
                overflowY: 'auto', padding: 24,
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <button
                        onClick={() => setShowAllPhotos(false)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: 16, fontWeight: 600, marginBottom: 24,
                            color: '#222', fontFamily: 'inherit',
                        }}
                    >
                        ← Close photos
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {place.photos?.map((photo, i) => (
                            <img key={i} src={photo} alt={`Photo ${i+1}`} style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ paddingTop: 28, paddingBottom: 80 }}>
            {/* Title */}
            <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>{place.title}</h1>

            {/* Address row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.098a3.75 3.75 0 013.754-1.298 3.75 3.75 0 01-2.07 7.225A3.75 3.75 0 0110.098 9.348z"/>
                    </svg>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(place.address)}`} target="_blank" rel="noreferrer"
                        style={{ color: '#222', fontWeight: 500, textDecoration: 'underline', fontSize: 14 }}>
                        {place.address}
                    </a>
                </div>
            </div>

            {/* Photo gallery */}
            <div style={{ position: 'relative', marginBottom: 32 }}>
                {place.photos?.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: place.photos.length === 1 ? '1fr' : '2fr 1fr',
                        gridTemplateRows: place.photos.length > 2 ? '1fr 1fr' : '1fr',
                        gap: 8, borderRadius: 16, overflow: 'hidden', height: 460,
                    }}>
                        {place.photos.slice(0, 5).map((photo, i) => (
                            <img
                                key={i}
                                src={photo}
                                alt={`Photo ${i+1}`}
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    cursor: 'pointer',
                                    gridRow: i === 0 && place.photos.length > 1 ? '1 / 3' : 'auto',
                                }}
                                onClick={() => setShowAllPhotos(true)}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        height: 360, borderRadius: 16, background: '#f0eded',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 48,
                    }}>🏡</div>
                )}
                {place.photos?.length > 4 && (
                    <button
                        onClick={() => setShowAllPhotos(true)}
                        style={{
                            position: 'absolute', bottom: 16, right: 16,
                            background: 'white', border: '1.5px solid #222',
                            borderRadius: 8, padding: '8px 14px', fontWeight: 600,
                            fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                            display: 'flex', alignItems: 'center', gap: 6,
                        }}
                    >
                        Show all photos
                    </button>
                )}
            </div>

            {/* Main content + Booking widget */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 380px',
                gap: 64,
                alignItems: 'start',
            }} className="place-layout">
                {/* Left: Details */}
                <div>
                    {/* Max guests */}
                    <div style={{ paddingBottom: 24, borderBottom: '1px solid #ddd', marginBottom: 24 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
                            Entire place · {place.maxGuests} guests
                        </h2>
                    </div>

                    {/* Description */}
                    {place.description && (
                        <div style={{ paddingBottom: 24, borderBottom: '1px solid #ddd', marginBottom: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>About this place</h3>
                            <p style={{ color: '#484848', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{place.description}</p>
                        </div>
                    )}

                    {/* Perks */}
                    {place.perks?.length > 0 && (
                        <div style={{ paddingBottom: 24, borderBottom: '1px solid #ddd', marginBottom: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>What this place offers</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {place.perks.map(perk => (
                                    <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                                        <span style={{ fontSize: 20 }}>{PERK_ICONS[perk] || '✓'}</span>
                                        <span style={{ textTransform: 'capitalize' }}>{perk.replace(/_/g, ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Extra info */}
                    {place.extraInfo && (
                        <div style={{ paddingBottom: 24 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>House rules</h3>
                            <p style={{ color: '#484848', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{place.extraInfo}</p>
                        </div>
                    )}
                </div>

                {/* Right: Booking widget */}
                <div className="booking-widget">
                    <div style={{ marginBottom: 20 }}>
                        <span style={{ fontSize: 22, fontWeight: 700 }}>₹{(place.price || 0).toLocaleString()}</span>
                        <span style={{ color: '#717171', fontSize: 16 }}> / night</span>
                    </div>

                    {bookingSuccess ? (
                        <div style={{
                            textAlign: 'center', padding: '32px 16px',
                            background: '#f0fdf4', borderRadius: 12,
                        }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Booking confirmed!</h3>
                            <p style={{ color: '#717171', fontSize: 14, marginBottom: 20 }}>
                                Your trip to {place.title} is booked.
                            </p>
                            <a href="/account/bookings" className="btn-primary" style={{ borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>
                                View my bookings
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleBook}>
                            {/* Date inputs */}
                            <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                    <div style={{ padding: '12px 14px', borderRight: '1px solid #ddd' }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>CHECK-IN</div>
                                        <input
                                            type="date" value={checkIn}
                                            onChange={e => setCheckIn(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                            style={{ border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', width: '100%', background: 'transparent' }}
                                        />
                                    </div>
                                    <div style={{ padding: '12px 14px' }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>CHECK-OUT</div>
                                        <input
                                            type="date" value={checkOut}
                                            onChange={e => setCheckOut(e.target.value)}
                                            min={checkIn || new Date().toISOString().split('T')[0]}
                                            required
                                            style={{ border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', width: '100%', background: 'transparent' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ borderTop: '1px solid #ddd', padding: '12px 14px' }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>GUESTS</div>
                                    <input
                                        type="number" value={guests}
                                        onChange={e => setGuests(Math.max(1, Math.min(place.maxGuests, +e.target.value)))}
                                        min={1} max={place.maxGuests} required
                                        style={{ border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', width: '100%', background: 'transparent' }}
                                    />
                                </div>
                            </div>

                            {bookingError && (
                                <p style={{ color: '#dc2626', fontSize: 14, marginBottom: 12 }}>{bookingError}</p>
                            )}

                            <button type="submit" className="btn-primary" disabled={bookingLoading}
                                style={{ width: '100%', borderRadius: 8, padding: '16px', fontSize: 16 }}>
                                {bookingLoading ? 'Booking...' : user ? 'Reserve' : 'Log in to book'}
                            </button>

                            {nights > 0 && (
                                <div style={{ marginTop: 20 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#484848', marginBottom: 8 }}>
                                        <span style={{ textDecoration: 'underline' }}>₹{place.price?.toLocaleString()} × {nights} nights</span>
                                        <span>₹{(place.price * nights).toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#484848', marginBottom: 16 }}>
                                        <span style={{ textDecoration: 'underline' }}>Airbnb service fee</span>
                                        <span>₹0</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, borderTop: '1px solid #ddd', paddingTop: 16 }}>
                                        <span>Total</span>
                                        <span>₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .place-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
