import { useState } from 'react';

const PlaceImage = ({ place, index = 0, className = '', alt = '' }) => {
    const [imgSrc, setImgSrc] = useState(() => {
        const photo = place?.photos?.[index];
        return photo || null;
    });
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (!imgSrc || error) {
        return (
            <div className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ${className}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 opacity-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}
            <img
                src={imgSrc}
                alt={alt || place?.title || 'Place photo'}
                className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </div>
    );
};

export default PlaceImage;
