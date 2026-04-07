import { useState, useRef, useEffect, cloneElement } from 'react';

const Popover = ({
    trigger,
    children,
    placement = 'bottom',
    className = '',
    closeOnInnerClick = false,
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
        if (open) document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open]);

    const placementClasses = {
        bottom:       'top-full mt-2 left-0',
        'bottom-end': 'top-full mt-2 right-0',
        top:          'bottom-full mb-2 left-0',
        'top-end':    'bottom-full mb-2 right-0',
        left:         'right-full mr-2 top-0',
        right:        'left-full ml-2 top-0',
    };

    return (
        <div ref={containerRef} className="relative inline-block">
            {/* Trigger element */}
            {cloneElement(trigger, {
                onClick: (e) => {
                    e.stopPropagation();
                    setOpen(o => !o);
                    trigger.props.onClick?.(e);
                },
                'aria-expanded': open,
                'aria-haspopup': 'true',
            })}

            {/* Popover panel */}
            {open && (
                <div
                    role="dialog"
                    onClick={closeOnInnerClick ? () => setOpen(false) : undefined}
                    className={`
                        absolute z-30 min-w-max bg-white border border-gray-100 rounded-2xl shadow-xl
                        animate-in fade-in zoom-in-95 duration-150
                        ${placementClasses[placement] || placementClasses.bottom}
                        ${className}
                    `}
                >
                    {/* Arrow indicator */}
                    {(placement === 'bottom' || placement === 'bottom-end') && (
                        <div className={`absolute -top-1.5 ${placement === 'bottom-end' ? 'right-4' : 'left-4'} w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 rounded-sm`} />
                    )}
                    <div className="relative">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popover;
