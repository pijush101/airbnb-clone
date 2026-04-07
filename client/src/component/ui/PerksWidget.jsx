import { PERKS_LIST } from './Perks';

const PerksWidget = ({ selected = [], onChange }) => {
    const toggle = (id) => {
        const updated = selected.includes(id)
            ? selected.filter(p => p !== id)
            : [...selected, id];
        if (onChange) onChange(updated);
    };

    return (
        <div>
            <p className="text-sm text-gray-500 mb-3">
                Select all the amenities available at your place.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PERKS_LIST.map(perk => {
                    const isSelected = selected.includes(perk.id);
                    return (
                        <label
                            key={perk.id}
                            htmlFor={`perk-${perk.id}`}
                            className={`
                                flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer
                                transition-all duration-200 select-none
                                ${isSelected
                                    ? 'border-primary bg-rose-50 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50'
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                id={`perk-${perk.id}`}
                                checked={isSelected}
                                onChange={() => toggle(perk.id)}
                                className="sr-only"
                            />
                            <span className={`${isSelected ? 'text-primary' : 'text-gray-400'} transition-colors`}>
                                {perk.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                                    {perk.label}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{perk.description}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${isSelected ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>

            {selected.length > 0 && (
                <p className="mt-3 text-xs text-gray-500">
                    {selected.length} {selected.length === 1 ? 'amenity' : 'amenities'} selected
                </p>
            )}
        </div>
    );
};

export default PerksWidget;
