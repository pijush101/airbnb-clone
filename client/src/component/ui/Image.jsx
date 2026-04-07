import { useState } from 'react';

const Image = ({
    src,
    alt = '',
    className = '',
    fallbackSrc = '/placeholder.jpg',
    objectFit = 'cover',
    rounded = false,
    aspectRatio,
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const fitClass = {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none',
    };

    const aspectClass = {
        square: 'aspect-square',
        video: 'aspect-video',
        photo: 'aspect-[4/3]',
        wide: 'aspect-[16/9]',
    };

    return (
        <div
            className={`
                relative overflow-hidden bg-gray-100
                ${rounded ? 'rounded-xl' : ''}
                ${aspectRatio ? aspectClass[aspectRatio] || '' : ''}
                ${className}
            `}
        >
            {/* Skeleton shimmer while loading */}
            {!loaded && !error && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
            )}

            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className="text-xs">Image unavailable</span>
                </div>
            ) : (
                <img
                    src={imgSrc}
                    alt={alt}
                    className={`w-full h-full transition-opacity duration-300 ${fitClass[objectFit] || 'object-cover'} ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => {
                        if (imgSrc !== fallbackSrc) {
                            setImgSrc(fallbackSrc);
                        } else {
                            setError(true);
                        }
                    }}
                    {...props}
                />
            )}
        </div>
    );
};

export default Image;
