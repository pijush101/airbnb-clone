import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            minHeight: '60vh', padding: '40px 24px', textAlign: 'center',
        }}>
            {/* Airbnb logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ width: 64, height: 64, fill: '#FF385C', marginBottom: 24 }}>
                <path d="M16 1C8.82 1 3 6.82 3 14c0 4.41 2.07 8.33 5.28 10.9L16 31l7.72-6.1C26.93 22.33 29 18.41 29 14 29 6.82 23.18 1 16 1zm0 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
            </svg>

            <h1 style={{ fontSize: 48, fontWeight: 800, color: '#FF385C', marginBottom: 8 }}>404</h1>
            <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 12 }}>Page not found</h2>
            <p style={{ color: '#717171', fontSize: 16, maxWidth: 400, lineHeight: 1.6, marginBottom: 32 }}>
                It seems like we can't find the page you're looking for.
                Head back home and keep exploring.
            </p>
            <Link
                to="/"
                className="btn-primary"
                style={{ borderRadius: 8, textDecoration: 'none', padding: '14px 32px', fontSize: 16 }}
            >
                Go back home
            </Link>
        </div>
    );
}
