// Simple Avatar component — no external dependencies
export default function Avatar({ name, picture, size = 'md' }) {
    const sizes = {
        sm: { box: 32, font: 13 },
        md: { box: 40, font: 16 },
        lg: { box: 56, font: 22 },
    };
    const { box, font } = sizes[size] || sizes.md;
    const initial = name?.[0]?.toUpperCase() || '?';

    return (
        <div style={{
            width: box, height: box,
            borderRadius: '50%',
            background: picture ? 'transparent' : '#FF385C',
            color: 'white',
            fontSize: font,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
        }}>
            {picture ? (
                <img
                    src={picture}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            ) : initial}
        </div>
    );
}
