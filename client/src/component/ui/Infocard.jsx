import { Link } from 'react-router-dom';
import PlaceImage from './PlaceImage';
import BookingDates from './BookingDates';

const Infocard = ({ booking }) => {
    if (!booking) return null;

    const { place, checkIn, checkOut, price, numberOfGuests, _id } = booking;

    const nights = checkIn && checkOut
        ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
        : 0;

    return (
        <Link
            to={`/account/bookings/${_id}`}
            id={`booking-card-${_id}`}
            className="group flex flex-col sm:flex-row gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
            {/* Image */}
            <div className="sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                <PlaceImage
                    place={place}
                    className="w-full h-full object-cover sm:rounded-l-2xl group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1 truncate">
                        {place?.title || 'Unnamed Place'}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-4 truncate">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {place?.address || 'Location not specified'}
                    </p>

                    <BookingDates booking={{ checkIn, checkOut }} />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        {numberOfGuests} {numberOfGuests === 1 ? 'guest' : 'guests'}
                        {nights > 0 && (
                            <span className="ml-2 text-gray-400">· {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">${price}</p>
                        <p className="text-xs text-gray-400">total</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Infocard;
