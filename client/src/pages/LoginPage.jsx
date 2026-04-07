import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { UserContext } from '../providers/UserProvider';

export default function LoginPage() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            {/* Background decoration */}
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
                    Welcome back
                </h1>
                <p style={{ color: '#717171', fontSize: 15, textAlign: 'center', marginBottom: 28 }}>
                    Log in to your Airbnb account
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
                            Email address
                        </label>
                        <input
                            id="login-email"
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <label style={{ fontWeight: 500, fontSize: 14 }}>Password</label>
                            <button type="button" style={{ fontSize: 13, color: '#FF385C', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                                Forgot password?
                            </button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="login-password"
                                type={showPass ? 'text' : 'password'}
                                className="input-field"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
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

                    <button
                        id="login-submit"
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ width: '100%', marginTop: 4, padding: '16px', fontSize: 16, borderRadius: 8 }}
                    >
                        {loading ? (
                            <><span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Logging in...</>
                        ) : 'Log in'}
                    </button>
                </form>

                <div className="auth-divider">or</div>

                {/* Google login placeholder */}
                <button
                    type="button"
                    style={{
                        width: '100%', padding: '14px', border: '1.5px solid #ddd',
                        borderRadius: 8, background: 'white', fontSize: 15,
                        fontWeight: 500, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', gap: 10,
                        transition: 'box-shadow 0.2s', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#717171' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#222', fontWeight: 600, textDecoration: 'underline' }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
