import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlaces, searchPlaces } from '../api';
import { PlaceContext } from '../providers/PlaceProvider';

const CATEGORIES = [
    { label: 'Beachfront', icon: '🏖️' },
    { label: 'Cabins', icon: '🏕️' },
    { label: 'Amazing views', icon: '🏔️' },
    { label: 'Mansions', icon: '🏰' },
    { label: 'Trending', icon: '📈' },
    { label: 'Farms', icon: '🌾' },
    { label: 'Lakefront', icon: '🏞️' },
    { label: 'Skiing', icon: '⛷️' },
    { label: 'Islands', icon: '🏝️' },
    { label: 'Camping', icon: '⛺' },
    { label: 'Arctic', icon: '🧊' },
    { label: 'Desert', icon: '🏜️' },
];

function PlaceCard({ place }) {
    const photo = place.photos?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';
    const price = place.price || 0;
    const address = place.address || 'Beautiful location';
    const title = place.title || 'Cozy Stay';

    return (
        <Link to={`/place/${place._id}`} className="place-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="place-card-img-wrap">
                <img
                    src={photo}
                    alt={title}
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                />
                {/* Heart button */}
                <button
                    onClick={(e) => { e.preventDefault(); }}
                    style={{
                        position: 'absolute', top: 12, right: 12,
                        background: 'none', border: 'none', cursor: 'pointer',
                        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                        fontSize: 20,
                    }}
                    aria-label="Add to wishlist"
                >
                    🤍
                </button>
            </div>

            <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontWeight: 600, fontSize: 15, color: '#222', flex: 1, marginRight: 8 }}>
                        {address}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12 }}>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span style={{ fontSize: 13 }}>New</span>
                    </div>
                </div>
                <p style={{ fontSize: 14, color: '#717171', marginTop: 2 }}>{title}</p>
                <p style={{ fontSize: 14, marginTop: 6 }}>
                    <span style={{ fontWeight: 600 }}>₹{price.toLocaleString()}</span>
                    <span style={{ color: '#717171' }}> night</span>
                </p>
            </div>
        </Link>
    );
}

function SkeletonCard() {
    return (
        <div>
            <div style={{
                aspectRatio: '1/1', borderRadius: 12, background: '#ebebeb',
                animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            <div style={{ marginTop: 10 }}>
                <div style={{ height: 14, width: '70%', background: '#ebebeb', borderRadius: 4, marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ height: 12, width: '50%', background: '#ebebeb', borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite' }} />
            </div>
        </div>
    );
}

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Beachfront');
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        getAllPlaces()
            .then(data => {
                setPlaces(data.places || []);
                setError('');
            })
            .catch(() => {
                setError('Could not load listings. Is the server running?');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {/* Category bar */}
            <div style={{ position: 'sticky', top: 64, zIndex: 30, background: 'white', borderBottom: '1px solid #ddd' }}>
                <div className="page-container">
                    <div style={{ display: 'flex', gap: 28, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 0 2px' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.label}
                                id={`cat-${cat.label.replace(/\s/g,'-').toLowerCase()}`}
                                onClick={() => setActiveCategory(cat.label)}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    gap: 6, padding: '14px 4px 12px', background: 'none', border: 'none',
                                    cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 12, fontWeight: 500,
                                    color: activeCategory === cat.label ? '#222' : '#717171',
                                    borderBottom: activeCategory === cat.label ? '2px solid #222' : '2px solid transparent',
                                    transition: 'all 0.2s', flexShrink: 0,
                                }}
                            >
                                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="page-container" style={{ paddingTop: 32, paddingBottom: 64 }}>
                {error && (
                    <div style={{
                        textAlign: 'center', padding: '60px 24px',
                        background: '#fff5f5', borderRadius: 12,
                        color: '#c0155a', fontSize: 15,
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
                        {error}
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '32px 24px',
                }}>
                    {loading
                        ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
                        : places.length > 0
                            ? places.map(place => <PlaceCard key={place._id} place={place} />)
                            : !error && (
                                <div style={{
                                    gridColumn: '1/-1', textAlign: 'center',
                                    padding: '80px 24px',
                                }}>
                                    <div style={{ fontSize: 64, marginBottom: 16 }}>🏡</div>
                                    <h2 style={{ fontSize: 22, marginBottom: 8, color: '#222' }}>No places yet</h2>
                                    <p style={{ color: '#717171', marginBottom: 24 }}>
                                        Be the first to list your place on Airbnb!
                                    </p>
                                    <Link to="/account/places/new" className="btn-primary" style={{ borderRadius: 8 }}>
                                        Add your home
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}
