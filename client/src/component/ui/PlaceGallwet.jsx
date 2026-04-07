import { useState } from 'react';
import PlaceImage from './PlaceImage';

const PlaceGallwet = ({ place }) => {
    const [showAll, setShowAll] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null);

    if (!place?.photos?.length) return null;

    const photos = place.photos;
    const displayPhotos = photos.slice(0, 5);

    const openLightbox = (idx) => setActiveIdx(idx);
    const closeLightbox = () => setActiveIdx(null);
    const prevPhoto = () => setActiveIdx(i => (i - 1 + photos.length) % photos.length);
    const nextPhoto = () => setActiveIdx(i => (i + 1) % photos.length);

    return (
        <>
            {/* Gallery grid */}
            <div className="relative">
                <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] sm:h-[500px]">
                    {/* Main large photo */}
                    <div
                        className="col-span-2 row-span-2 cursor-pointer overflow-hidden"
                        onClick={() => openLightbox(0)}
                    >
                        <img
                            src={photos[0]}
                            alt={`${place.title} - photo 1`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Side thumbnails */}
                    {displayPhotos.slice(1, 5).map((photo, i) => (
                        <div
                            key={i}
                            className="col-span-1 row-span-1 cursor-pointer overflow-hidden relative"
                            onClick={() => openLightbox(i + 1)}
                        >
                            <img
                                src={photo}
                                alt={`${place.title} - photo ${i + 2}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                            {/* Show all overlay on last thumbnail */}
                            {i === 3 && photos.length > 5 && (
                                <div
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                                >
                                    <span className="text-white font-semibold text-sm">+{photos.length - 5} more</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Show all photos button */}
                <button
                    onClick={() => openLightbox(0)}
                    className="absolute bottom-4 right-4 bg-white border border-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded-xl shadow hover:shadow-md transition-all flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                    Show all photos
                </button>
            </div>

            {/* Lightbox */}
            {activeIdx !== null && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        onClick={prevPhoto}
                        className="absolute left-4 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <img
                        src={photos[activeIdx]}
                        alt={`Photo ${activeIdx + 1}`}
                        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                    />

                    <button
                        onClick={nextPhoto}
                        className="absolute right-4 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                        {activeIdx + 1} / {photos.length}
                    </span>
                </div>
            )}
        </>
    );
};

export default PlaceGallwet;
