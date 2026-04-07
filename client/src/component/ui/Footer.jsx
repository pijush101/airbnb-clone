import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex w-full justify-center bg-gray-100 pb-8">
            <div className="flex w-full max-w-screen-xl flex-col items-center px-6">
                {/* Grid for links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full py-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-primary">
                                <path d="M16 1C8.82 1 3 6.82 3 14c0 4.41 2.07 8.33 5.28 10.9L16 31l7.72-6.1C26.93 22.33 29 18.41 29 14 29 6.82 23.18 1 16 1zm0 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
                            </svg>
                            <span className="text-xl font-bold text-primary">airbnb</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Find your perfect stay anywhere in the world. Book unique homes and experiences.
                        </p>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Support</h3>
                        <ul className="space-y-2">
                            {['Help Center', 'Safety Information', 'Cancellation Options', 'Our COVID-19 Response'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Community</h3>
                        <ul className="space-y-2">
                            {['Airbnb.org', 'Against Discrimination', 'Invite Friends', 'Gift Cards'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hosting */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Hosting</h3>
                        <ul className="space-y-2">
                            {['Try Hosting', 'AirCover for Hosts', 'Explore Hosting Resources', 'Community Forum'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-200 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-sm text-gray-500">
                            © {currentYear} Airbnb Clone. All rights reserved.
                        </p>
                        <div className="flex items-center gap-5">
                            {['Privacy', 'Terms', 'Sitemap'].map(item => (
                                <a key={item} href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>
                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            {[
                                { label: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                            ].map(({ label, path }) => (
                                <a key={label} href="#" aria-label={label} className="text-gray-400 hover:text-primary transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                        <path d={path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
