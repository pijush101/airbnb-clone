const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...props
}) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-rose-500 text-white hover:opacity-90 focus:ring-primary',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
        ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;
