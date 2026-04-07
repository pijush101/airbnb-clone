import { Link } from 'react-router-dom';
import PlaceImage from './PlaceImage';

const PlaceCard = ({ place }) => {
    if (!place) return null;

    const { _id, title, address, price, photos, maxGuests } = place;

    return (
        <Link
            to={`/place/${_id}`}
            id={`place-card-${_id}`}
            className="group block rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <PlaceImage
                    place={place}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Wishlist button */}
                <button
                    type="button"
                    onClick={e => e.preventDefault()}
                    aria-label="Save to wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-white shadow transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>

                {/* Photo count badge */}
                {photos?.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                        +{photos.length - 1}
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="pt-3 px-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    {/* Rating placeholder */}
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-900">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium text-gray-800">New</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{address}</p>

                {maxGuests && (
                    <p className="text-xs text-gray-400 mt-0.5">Up to {maxGuests} guests</p>
                )}

                <p className="mt-2 text-sm text-gray-800">
                    <span className="font-bold">${price}</span>
                    <span className="text-gray-500 font-normal"> / night</span>
                </p>
            </div>
        </Link>
    );
};

export default PlaceCard;
