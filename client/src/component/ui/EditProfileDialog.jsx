import { useState, useRef, useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { updateUser } from '../../api';

const EditProfileDialog = ({ isOpen, onClose }) => {
    const { user, setUser } = useContext(UserContext);
    const uploadRef = useRef(null);
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({
        name: user?.name || '',
        password: '',
        confirmPassword: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setPicture(file);
    };

    const handleUserData = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setError('');
        const { name, password, confirmPassword } = userData;

        if (!name.trim()) { setError('Name cannot be empty'); return; }
        if (password && password !== confirmPassword) { setError('Passwords do not match'); return; }

        setLoading(true);
        try {
            const payload = { name, email: user.email };
            if (password) payload.password = password;

            const data = await updateUser(payload);
            setUser(data.user);
            onClose();
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                }}
            />

            {/* Panel */}
            <div style={{
                position: 'relative', background: 'white',
                borderRadius: 16, padding: 28, width: '100%', maxWidth: 480,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700 }}>Edit profile</h2>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 22, color: '#717171', lineHeight: 1,
                    }}>✕</button>
                </div>

                {/* Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                    <div
                        onClick={() => uploadRef.current.click()}
                        style={{
                            width: 80, height: 80, borderRadius: '50%',
                            background: '#FF385C', color: 'white',
                            fontSize: 28, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', cursor: 'pointer', position: 'relative',
                        }}
                    >
                        {picture ? (
                            <img src={URL.createObjectURL(picture)} alt="preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : user?.picture ? (
                            <img src={user.picture} alt={user.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            user?.name?.[0]?.toUpperCase()
                        )}
                    </div>
                    <input type="file" ref={uploadRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
                    <p style={{ marginTop: 8, fontSize: 12, color: '#717171' }}>Click to upload new photo</p>
                </div>

                {error && (
                    <div style={{
                        background: '#fff5f5', border: '1px solid #fecaca',
                        borderRadius: 8, padding: '10px 14px', color: '#dc2626',
                        fontSize: 13, marginBottom: 16,
                    }}>{error}</div>
                )}

                <form id="edit-profile-form" onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 5 }}>Full Name</label>
                        <input
                            id="edit-name"
                            className="input-field"
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleUserData}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #ebebeb' }} />
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#717171', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Change Password (optional)
                    </p>

                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 5 }}>New Password</label>
                        <input
                            id="new-password"
                            className="input-field"
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleUserData}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 5 }}>Confirm Password</label>
                        <input
                            id="confirm-password"
                            className="input-field"
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleUserData}
                            placeholder="Repeat new password"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                flex: 1, padding: '13px', border: '1.5px solid #ddd',
                                borderRadius: 8, background: 'white', fontFamily: 'inherit',
                                fontSize: 15, fontWeight: 500, cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ flex: 1, borderRadius: 8, fontSize: 15 }}
                        >
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileDialog;
