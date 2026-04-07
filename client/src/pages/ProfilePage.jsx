import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { getMyBookings, getMyPlaces, logoutUser, updateUser } from '../api';

const TABS = [
    { key: 'profile', label: 'Profile', icon: '👤', path: '/account' },
    { key: 'bookings', label: 'Bookings', icon: '📅', path: '/account/bookings' },
    { key: 'places', label: 'My places', icon: '🏡', path: '/account/places' },
];

function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function BookingCard({ booking }) {
    const place = booking.place || {};
    const photo = place.photos?.[0] || 'https://via.placeholder.com/120x90?text=N/A';
    return (
        <Link to={`/account/bookings/${booking._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
                display: 'flex', gap: 16, border: '1px solid #ddd',
                borderRadius: 12, padding: 16, transition: 'box-shadow 0.2s',
                background: 'white',
            }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
                <img src={photo} alt={place.title} style={{ width: 110, height: 90, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{place.title || 'Booking'}</h3>
                    <p style={{ fontSize: 13, color: '#717171', marginBottom: 6 }}>{place.address}</p>
                    <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                        <span>📅 {formatDate(booking.checkIn)} → {formatDate(booking.checkout)}</span>
                        <span>👥 {booking.numOfGuests} guests</span>
                    </div>
                    <p style={{ marginTop: 8, fontWeight: 600, color: '#222' }}>
                        Total: ₹{(booking.price || 0).toLocaleString()}
                    </p>
                </div>
            </div>
        </Link>
    );
}

function PlaceCard({ place }) {
    const photo = place.photos?.[0];
    return (
        <Link to={`/account/places/${place._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
                display: 'flex', gap: 16, border: '1px solid #ddd',
                borderRadius: 12, padding: 16, transition: 'box-shadow 0.2s', background: 'white',
            }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
                {photo && (
                    <img src={photo} alt={place.title} style={{ width: 110, height: 90, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{place.title}</h3>
                    <p style={{ fontSize: 13, color: '#717171', marginBottom: 6 }}>{place.address}</p>
                    <p style={{ fontSize: 13 }}>₹{(place.price || 0).toLocaleString()}/night · Max {place.maxGuests} guests</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20, color: '#717171' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default function ProfilePage({ tab }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Determine active tab from prop
    const activeTab = tab || 'profile';

    const [bookings, setBookings] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    // Edit profile state
    const [editName, setEditName] = useState(user?.name || '');
    const [editEmail, setEditEmail] = useState(user?.email || '');
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    useEffect(() => {
        if (activeTab === 'bookings') {
            setLoadingData(true);
            getMyBookings().then(setBookings).catch(() => {}).finally(() => setLoadingData(false));
        }
        if (activeTab === 'places') {
            setLoadingData(true);
            getMyPlaces().then(setPlaces).catch(() => {}).finally(() => setLoadingData(false));
        }
    }, [activeTab]);

    async function handleLogout() {
        try { await logoutUser(); } catch (_) {}
        setUser(null);
        navigate('/');
    }

    async function handleSaveProfile(e) {
        e.preventDefault();
        setSaving(true);
        try {
            const data = await updateUser({ name: editName, email: editEmail });
            setUser(data.user);
            setSaveMsg('Profile updated!');
            setTimeout(() => setSaveMsg(''), 3000);
        } catch (err) {
            setSaveMsg('Error: ' + err.message);
        } finally {
            setSaving(false);
        }
    }

    if (!user) return null;

    return (
        <div className="page-container" style={{ paddingTop: 40, paddingBottom: 80 }}>
            {/* Tab nav */}
            <div style={{
                display: 'flex', gap: 4, justifyContent: 'center',
                marginBottom: 40, flexWrap: 'wrap',
            }}>
                {TABS.map(t => (
                    <Link
                        key={t.key}
                        to={t.path}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 20px', borderRadius: 9999,
                            textDecoration: 'none', fontSize: 14, fontWeight: 500,
                            background: activeTab === t.key ? '#222' : 'transparent',
                            color: activeTab === t.key ? 'white' : '#484848',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span>{t.icon}</span> {t.label}
                    </Link>
                ))}
            </div>

            {/* Profile tab */}
            {activeTab === 'profile' && (
                <div style={{ maxWidth: 560, margin: '0 auto' }}>
                    {/* Avatar */}
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{
                            width: 96, height: 96, borderRadius: '50%',
                            background: '#FF385C', color: 'white',
                            fontSize: 36, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 12px',
                            boxShadow: '0 4px 12px rgba(255,56,92,0.3)',
                        }}>
                            {user.picture ? (
                                <img src={user.picture} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                user.name?.[0]?.toUpperCase()
                            )}
                        </div>
                        <h2 style={{ fontSize: 22, fontWeight: 700 }}>{user.name}</h2>
                        <p style={{ color: '#717171', fontSize: 14 }}>{user.email}</p>
                    </div>

                    {/* Edit form */}
                    <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: 16, padding: 28 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Personal info</h3>
                        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Name</label>
                                <input className="input-field" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Your name" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Email</label>
                                <input className="input-field" type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="Your email" />
                            </div>
                            {saveMsg && (
                                <p style={{ color: saveMsg.startsWith('Error') ? '#dc2626' : '#16a34a', fontSize: 14 }}>{saveMsg}</p>
                            )}
                            <button className="btn-primary" type="submit" disabled={saving} style={{ alignSelf: 'flex-start', borderRadius: 8 }}>
                                {saving ? 'Saving...' : 'Save changes'}
                            </button>
                        </form>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: 24, width: '100%', padding: '14px',
                            border: '1.5px solid #ddd', borderRadius: 8,
                            background: 'white', fontSize: 15, fontWeight: 500,
                            cursor: 'pointer', color: '#717171', fontFamily: 'inherit',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#dc2626'; e.currentTarget.style.color = '#dc2626'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#717171'; }}
                    >
                        Log out
                    </button>
                </div>
            )}

            {/* Bookings tab */}
            {activeTab === 'bookings' && (
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Your trips</h2>
                    </div>
                    {loadingData ? (
                        <p style={{ color: '#717171', textAlign: 'center', padding: 40 }}>Loading bookings...</p>
                    ) : bookings.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>✈️</div>
                            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No trips booked... yet!</h3>
                            <p style={{ color: '#717171', marginBottom: 24 }}>Time to dust off your bags and start planning your next adventure.</p>
                            <Link to="/" className="btn-primary" style={{ borderRadius: 8, textDecoration: 'none' }}>Start exploring</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {bookings.map(b => <BookingCard key={b._id} booking={b} />)}
                        </div>
                    )}
                </div>
            )}

            {/* Places tab */}
            {activeTab === 'places' && (
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Your listings</h2>
                        <Link to="/account/places/new" className="btn-primary" style={{ borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>
                            + Add new place
                        </Link>
                    </div>
                    {loadingData ? (
                        <p style={{ color: '#717171', textAlign: 'center', padding: 40 }}>Loading places...</p>
                    ) : places.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>🏡</div>
                            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No places listed yet</h3>
                            <p style={{ color: '#717171', marginBottom: 24 }}>Share your home and start earning.</p>
                            <Link to="/account/places/new" className="btn-primary" style={{ borderRadius: 8, textDecoration: 'none' }}>
                                List your first place
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {places.map(p => <PlaceCard key={p._id} place={p} />)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
