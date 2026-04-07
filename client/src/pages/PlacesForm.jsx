import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addPlace, updatePlace, getSinglePlace, uploadByLink } from '../api';

const PERKS = [
    { name: 'wifi',            icon: '📶', label: 'Wifi' },
    { name: 'parking',         icon: '🅿️', label: 'Free parking' },
    { name: 'tv',              icon: '📺', label: 'TV' },
    { name: 'pets',            icon: '🐾', label: 'Pets allowed' },
    { name: 'kitchen',         icon: '🍳', label: 'Kitchen' },
    { name: 'private_entrance',icon: '🚪', label: 'Private entrance' },
];

export default function PlacesForm() {
    const { id } = useParams();     // if editing
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('');
    const [perks, setPerks] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            getSinglePlace(id).then(data => {
                const p = data.place;
                setTitle(p.title || '');
                setAddress(p.address || '');
                setDescription(p.description || '');
                setExtraInfo(p.extraInfo || '');
                setMaxGuests(p.maxGuests || 1);
                setPrice(p.price || '');
                setPerks(p.perks || []);
                setPhotos(p.photos || []);
            }).catch(() => setError('Could not load place.'));
        }
    }, [id, isEditing]);

    function togglePerk(perk) {
        setPerks(prev =>
            prev.includes(perk) ? prev.filter(p => p !== perk) : [...prev, perk]
        );
    }

    async function addPhotoByLink() {
        if (!photoLink.trim()) return;
        setUploading(true);
        try {
            const url = await uploadByLink(photoLink);
            setPhotos(prev => [...prev, url]);
            setPhotoLink('');
        } catch {
            alert('Failed to upload photo. Check the URL.');
        } finally {
            setUploading(false);
        }
    }

    function removePhoto(idx) {
        setPhotos(prev => prev.filter((_, i) => i !== idx));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (!title || !address || !price) {
            setError('Title, address and price are required.');
            return;
        }
        const payload = { title, address, description, extraInfo, maxGuests: +maxGuests, price: +price, perks, addedPhotos: photos };
        setLoading(true);
        try {
            if (isEditing) {
                await updatePlace({ ...payload, id });
            } else {
                await addPlace(payload);
            }
            navigate('/account/places');
        } catch (err) {
            setError(err.message || 'Failed to save place.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-container" style={{ paddingTop: 32, paddingBottom: 80, maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>←</button>
                <h1 style={{ fontSize: 26, fontWeight: 700 }}>
                    {isEditing ? 'Edit your place' : 'List your place on Airbnb'}
                </h1>
            </div>

            {error && (
                <div style={{
                    background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8,
                    padding: '12px 16px', color: '#dc2626', fontSize: 14, marginBottom: 24,
                }}>
                    ⚠️ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {/* Basic info */}
                <section style={{ border: '1px solid #ddd', borderRadius: 16, padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>📝 Basic information</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Title</label>
                            <input className="input-field" placeholder="Cozy beach house with ocean views" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Address</label>
                            <input className="input-field" placeholder="123 Beach Rd, Goa, India" value={address} onChange={e => setAddress(e.target.value)} required />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Description</label>
                            <textarea
                                className="input-field"
                                placeholder="Tell guests what makes your place special..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={4}
                                style={{ resize: 'vertical' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Max guests</label>
                                <input className="input-field" type="number" min={1} max={50} value={maxGuests} onChange={e => setMaxGuests(e.target.value)} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>Price per night (₹)</label>
                                <input className="input-field" type="number" min={1} placeholder="2000" value={price} onChange={e => setPrice(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Photos */}
                <section style={{ border: '1px solid #ddd', borderRadius: 16, padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>📸 Photos</h2>
                    <p style={{ color: '#717171', fontSize: 14, marginBottom: 16 }}>Add photos by pasting image URLs below.</p>

                    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                        <input
                            className="input-field"
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={photoLink}
                            onChange={e => setPhotoLink(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <button
                            type="button"
                            onClick={addPhotoByLink}
                            disabled={uploading}
                            className="btn-primary"
                            style={{ borderRadius: 8, whiteSpace: 'nowrap', flexShrink: 0 }}
                        >
                            {uploading ? 'Adding...' : 'Add photo'}
                        </button>
                    </div>

                    {photos.length > 0 && (
                        <div className="photo-grid">
                            {photos.map((photo, i) => (
                                <div key={i} className="photo-thumb">
                                    <img src={photo} alt={`Photo ${i+1}`} />
                                    <button className="remove-btn" type="button" onClick={() => removePhoto(i)}>✕</button>
                                    {i === 0 && (
                                        <div style={{
                                            position: 'absolute', bottom: 6, left: 6,
                                            background: '#222', color: 'white',
                                            fontSize: 11, fontWeight: 600, padding: '2px 8px',
                                            borderRadius: 4,
                                        }}>Cover</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Perks */}
                <section style={{ border: '1px solid #ddd', borderRadius: 16, padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>🎁 Amenities</h2>
                    <p style={{ color: '#717171', fontSize: 14, marginBottom: 16 }}>Select all that apply.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
                        {PERKS.map(p => (
                            <button
                                key={p.name}
                                type="button"
                                onClick={() => togglePerk(p.name)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '14px 16px',
                                    border: perks.includes(p.name) ? '2px solid #222' : '1.5px solid #ddd',
                                    borderRadius: 8, cursor: 'pointer',
                                    background: perks.includes(p.name) ? '#f7f7f7' : 'white',
                                    fontFamily: 'inherit', fontSize: 14, fontWeight: perks.includes(p.name) ? 600 : 400,
                                    transition: 'all 0.2s',
                                }}
                            >
                                <span style={{ fontSize: 20 }}>{p.icon}</span>
                                {p.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* House rules */}
                <section style={{ border: '1px solid #ddd', borderRadius: 16, padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>📜 House rules</h2>
                    <p style={{ color: '#717171', fontSize: 14, marginBottom: 16 }}>Tell guests any additional rules or information.</p>
                    <textarea
                        className="input-field"
                        placeholder="No smoking, no parties, quiet hours after 10pm..."
                        value={extraInfo}
                        onChange={e => setExtraInfo(e.target.value)}
                        rows={4}
                        style={{ resize: 'vertical' }}
                    />
                </section>

                {/* Submit */}
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-outline"
                        style={{ flex: 1, borderRadius: 8 }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ flex: 2, borderRadius: 8, fontSize: 16, padding: '16px' }}
                    >
                        {loading ? 'Saving...' : isEditing ? 'Save changes' : 'List my place'}
                    </button>
                </div>
            </form>
        </div>
    );
}
