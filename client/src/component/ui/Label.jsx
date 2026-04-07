const Label = ({
    htmlFor,
    children,
    required = false,
    className = '',
    hint = '',
}) => {
    return (
        <div className={`mb-1.5 ${className}`}>
            <label
                htmlFor={htmlFor}
                className="block text-sm font-semibold text-gray-700"
            >
                {children}
                {required && (
                    <span className="ml-1 text-red-500" aria-hidden="true">*</span>
                )}
            </label>
            {hint && (
                <p className="mt-0.5 text-xs text-gray-400">{hint}</p>
            )}
        </div>
    );
};

export default Label;
