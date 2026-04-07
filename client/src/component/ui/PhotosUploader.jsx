import { useState, useRef } from 'react';
import Spinner from './Spinner';

const PhotosUploader = ({ photos = [], onChange }) => {
    const [photoLink, setPhotoLink] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const addByLink = async (e) => {
        e.preventDefault();
        if (!photoLink.trim()) return;
        setUploading(true);
        setError('');
        try {
            const res = await fetch('/api/upload-by-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ link: photoLink }),
            });
            if (!res.ok) throw new Error('Upload failed');
            const url = await res.json();
            onChange([...photos, url]);
            setPhotoLink('');
        } catch {
            setError('Failed to upload from link. Please check the URL and try again.');
        } finally {
            setUploading(false);
        }
    };

    const uploadFiles = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);
        setError('');
        try {
            const formData = new FormData();
            files.forEach(f => formData.append('photos', f));
            const res = await fetch('/api/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');
            const urls = await res.json();
            onChange([...photos, ...(Array.isArray(urls) ? urls : [urls])]);
        } catch {
            setError('Failed to upload files. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removePhoto = (idx) => {
        onChange(photos.filter((_, i) => i !== idx));
    };

    const makeMainPhoto = (idx) => {
        const updated = [...photos];
        const [main] = updated.splice(idx, 1);
        onChange([main, ...updated]);
    };

    return (
        <div className="space-y-4">
            {/* Link upload */}
            <form onSubmit={addByLink} className="flex gap-2">
                <input
                    type="url"
                    value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)}
                    placeholder="Paste image URL here..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <button
                    type="submit"
                    disabled={uploading}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {uploading ? <Spinner size="sm" /> : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                    )}
                    Add URL
                </button>
            </form>

            {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
            )}

            {/* Photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photos.map((photo, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                        <img
                            src={photo}
                            alt={`Place photo ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => makeMainPhoto(idx)}
                                title={idx === 0 ? 'Main photo' : 'Set as main'}
                                className={`p-1.5 rounded-full text-white transition-colors ${idx === 0 ? 'bg-yellow-400' : 'bg-white/20 hover:bg-white/40'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                title="Remove photo"
                                className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {idx === 0 && (
                            <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">Main</span>
                        )}
                    </div>
                ))}

                {/* File upload button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-rose-50 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-primary transition-all duration-200 disabled:opacity-50"
                >
                    {uploading ? (
                        <Spinner />
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            <span className="text-xs font-medium">Upload</span>
                        </>
                    )}
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={uploadFiles}
            />
        </div>
    );
};

export default PhotosUploader;
