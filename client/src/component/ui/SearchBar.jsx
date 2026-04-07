import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
    { id: 'beach', label: 'Beach', emoji: '🏖️' },
    { id: 'mountains', label: 'Mountains', emoji: '🏔️' },
    { id: 'city', label: 'City', emoji: '🏙️' },
    { id: 'countryside', label: 'Countryside', emoji: '🌾' },
    { id: 'cabin', label: 'Cabin', emoji: '🪵' },
    { id: 'pool', label: 'Pool', emoji: '🏊' },
    { id: 'camping', label: 'Camping', emoji: '⛺' },
    { id: 'luxury', label: 'Luxury', emoji: '✨' },
];

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Mock suggestion logic (replace with real API call)
    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        const mock = [
            'Bali, Indonesia',
            'Barcelona, Spain',
            'New York, USA',
            'Paris, France',
            'Tokyo, Japan',
            'London, UK',
        ].filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
        setSuggestions(mock);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/?search=${encodeURIComponent(query.trim())}`);
        setFocused(false);
        inputRef.current?.blur();
    };

    const selectSuggestion = (s) => {
        setQuery(s);
        navigate(`/?search=${encodeURIComponent(s)}`);
        setFocused(false);
    };

    return (
        <div className="relative w-full">
            <form
                onSubmit={handleSearch}
                className={`flex items-center gap-2 bg-white border-2 rounded-full px-4 py-2 transition-all duration-200 shadow-sm
                    ${focused ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'}
                `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    placeholder="Search destinations..."
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none min-w-0"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(''); setSuggestions([]); }}
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-primary text-white rounded-full p-1.5 hover:opacity-90 transition-opacity flex-shrink-0"
                    aria-label="Search"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>

            {/* Suggestions dropdown */}
            {focused && (suggestions.length > 0 || !query) && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden">
                    {!query && (
                        <div className="p-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-2">Popular categories</p>
                            <div className="grid grid-cols-4 gap-1">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => selectSuggestion(cat.label)}
                                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-xl">{cat.emoji}</span>
                                        <span className="text-xs text-gray-600">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {suggestions.length > 0 && (
                        <ul className="py-1 border-t border-gray-100">
                            {suggestions.map(s => (
                                <li key={s}>
                                    <button
                                        type="button"
                                        onMouseDown={() => selectSuggestion(s)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        {s}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
