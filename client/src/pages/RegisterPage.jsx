import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import { UserContext } from '../providers/UserProvider';

export default function RegisterPage() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            const data = await registerUser(name, email, password);
            setUser(data.user);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0,
                background: 'linear-gradient(135deg, #fff5f5 0%, #fff 50%, #f0f4ff 100%)',
            }} />

            <div className="auth-card" style={{ position: 'relative', zIndex: 1 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ width: 36, height: 36, fill: '#FF385C' }}>
                            <path d="M16 1C8.82 1 3 6.82 3 14c0 4.41 2.07 8.33 5.28 10.9L16 31l7.72-6.1C26.93 22.33 29 18.41 29 14 29 6.82 23.18 1 16 1zm0 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
                        </svg>
                        <span style={{ fontSize: 24, fontWeight: 700, color: '#FF385C' }}>airbnb</span>
                    </Link>
                </div>

                <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, textAlign: 'center' }}>
                    Create your account
                </h1>
                <p style={{ color: '#717171', fontSize: 15, textAlign: 'center', marginBottom: 28 }}>
                    Join millions of travellers on Airbnb
                </p>

                {error && (
                    <div style={{
                        background: '#fff5f5', border: '1px solid #fecaca',
                        borderRadius: 8, padding: '12px 16px',
                        color: '#dc2626', fontSize: 14, marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>
                            Full name
                        </label>
                        <input
                            id="register-name"
                            type="text"
                            className="input-field"
                            placeholder="John Doe"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>
                            Email address
                        </label>
                        <input
                            id="register-email"
                            type="email"
                            className="input-field"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="register-password"
                                type={showPass ? 'text' : 'password'}
                                className="input-field"
                                placeholder="Min. 6 characters"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                style={{ paddingRight: 48 }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(v => !v)}
                                style={{
                                    position: 'absolute', right: 14, top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', color: '#717171', fontSize: 18,
                                }}
                            >
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 500, fontSize: 14, marginBottom: 6 }}>
                            Confirm password
                        </label>
                        <input
                            id="register-confirm-password"
                            type={showPass ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <p style={{ fontSize: 12, color: '#717171', lineHeight: 1.5 }}>
                        By selecting <strong>Agree and continue</strong>, I agree to Airbnb's{' '}
                        <a href="#" style={{ color: '#222', fontWeight: 500 }}>Terms of Service</a>,{' '}
                        <a href="#" style={{ color: '#222', fontWeight: 500 }}>Payments Terms of Service</a>, and{' '}
                        <a href="#" style={{ color: '#222', fontWeight: 500 }}>Privacy Policy</a>.
                    </p>

                    <button
                        id="register-submit"
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ width: '100%', padding: '16px', fontSize: 16, borderRadius: 8 }}
                    >
                        {loading ? (
                            <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Creating account...</>
                        ) : 'Agree and continue'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#717171' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#222', fontWeight: 600, textDecoration: 'underline' }}>
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
