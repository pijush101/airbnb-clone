const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
    const sizeClasses = {
        xs: 'w-3 h-3 border-[1.5px]',
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-10 h-10 border-[3px]',
        xl: 'w-14 h-14 border-4',
    };

    const colorClasses = {
        primary: 'border-primary/20 border-t-primary',
        white:   'border-white/30 border-t-white',
        gray:    'border-gray-200 border-t-gray-600',
        rose:    'border-rose-200 border-t-rose-500',
    };

    return (
        <div
            role="status"
            aria-label="Loading"
            className={`inline-block rounded-full animate-spin ${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.primary} ${className}`}
        />
    );
};

// Full-page loading overlay variant
export const FullPageSpinner = ({ message = 'Loading...' }) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm gap-4">
        <Spinner size="xl" />
        {message && <p className="text-sm font-medium text-gray-500">{message}</p>}
    </div>
);

export default Spinner;
