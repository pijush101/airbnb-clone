import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import Avatar from './Avatar';
import SearchBar from './SearchBar';

const Header = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-primary">
                            <path d="M16 1C8.82 1 3 6.82 3 14c0 4.41 2.07 8.33 5.28 10.9L16 31l7.72-6.1C26.93 22.33 29 18.41 29 14 29 6.82 23.18 1 16 1zm0 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
                        </svg>
                        <span className="text-xl font-bold text-primary hidden sm:inline">airbnb</span>
                    </Link>

                    {/* Search bar – center */}
                    <div className="flex-1 max-w-xl hidden md:block">
                        <SearchBar />
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Link
                            to="/account/places/new"
                            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add place
                        </Link>

                        {/* User menu */}
                        <div className="relative">
                            <button
                                id="user-menu-btn"
                                onClick={() => setMenuOpen(o => !o)}
                                className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 hover:shadow-md transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {user ? (
                                    <Avatar name={user.name} size="sm" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>

                            {menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                                        {user ? (
                                            <>
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <nav className="py-1">
                                                    {[
                                                        { label: 'Profile', to: '/account' },
                                                        { label: 'My Bookings', to: '/account/bookings' },
                                                        { label: 'My Places', to: '/account/places' },
                                                    ].map(({ label, to }) => (
                                                        <Link
                                                            key={to}
                                                            to={to}
                                                            onClick={() => setMenuOpen(false)}
                                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            {label}
                                                        </Link>
                                                    ))}
                                                </nav>
                                                <div className="border-t border-gray-100 py-1">
                                                    <button
                                                        onClick={() => { setMenuOpen(false); navigate('/logout'); }}
                                                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        Log out
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <nav className="py-1">
                                                <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50">Sign in</Link>
                                                <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">Sign up</Link>
                                            </nav>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="md:hidden pb-3">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default Header;
