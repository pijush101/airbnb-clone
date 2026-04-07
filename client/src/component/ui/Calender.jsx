import { useState } from 'react';

const Calender = ({ onDateSelect, disabledDates = [], minDate = new Date() }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ['January','February','March','April','May','June',
        'July','August','September','October','November','December'];
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const isDisabled = (day) => {
        const date = new Date(year, month, day);
        if (date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
        return disabledDates.some(d => new Date(d).toDateString() === date.toDateString());
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        return new Date(year, month, day).toDateString() === selectedDate.toDateString();
    };

    const handleSelect = (day) => {
        if (isDisabled(day)) return;
        const date = new Date(year, month, day);
        setSelectedDate(date);
        if (onDateSelect) onDateSelect(date);
    };

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 w-full max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous month"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h2 className="text-sm font-bold text-gray-800">
                    {monthNames[month]} {year}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next month"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 mb-2">
                {dayNames.map(d => (
                    <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-y-1">
                {days.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                        {day ? (
                            <button
                                onClick={() => handleSelect(day)}
                                disabled={isDisabled(day)}
                                className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-150
                                    ${isSelected(day)
                                        ? 'bg-primary text-white shadow-md'
                                        : isDisabled(day)
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-rose-50 hover:text-primary'
                                    }`}
                            >
                                {day}
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calender;
