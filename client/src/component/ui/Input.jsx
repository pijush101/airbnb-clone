import { forwardRef } from 'react';

const Input = forwardRef(({
    id,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    disabled = false,
    error = '',
    icon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {icon}
                </div>
            )}
            <input
                ref={ref}
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={`
                    w-full rounded-xl border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400
                    outline-none transition-all duration-200
                    bg-white
                    ${icon ? 'pl-10' : ''}
                    ${error
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300 focus:border-red-400'
                        : 'border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
