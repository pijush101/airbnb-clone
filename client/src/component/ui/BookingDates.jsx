import React from "react";
import { differenceInCalendarDays, format } from "date-fns";

const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M6 10.5h.008v.008H6v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0h.008v.008H9.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0h.008v.008H13.5v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0h.008v.008H17.25v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
    </svg>
);

const BookingDates = ({ booking, className = '' }) => {
    return (
        <div className={'flex gap-1 ' + className}>
            <span className="flex items-center gap-1">
                <CalendarIcon />
                {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn),
                )} nights:
            </span>
            <div className="ml-2 flex items-center gap-1">
                <CalendarIcon />
                {format(new Date(booking.checkIn), 'MMM d, yyyy')} &rarr;{' '}
            </div>
            <div className="flex items-center gap-1">
                <CalendarIcon />
                {format(new Date(booking.checkOut), 'MMM d, yyyy')}
            </div>
        </div>
    );
};

export default BookingDates;
