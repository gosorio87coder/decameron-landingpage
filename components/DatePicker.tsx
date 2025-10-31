import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/ChevronIcons';
import { CalendarIcon } from './icons/FeatureIcons';

interface SpecialDateGroup {
    label: string;
    price: number;
    dates: Date[];
}

interface DatePickerProps {
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    selectableDays?: number[];
    minDaysFromToday?: number;
    specialDateGroups?: SpecialDateGroup[];
    soldOutDates?: Date[];
    highlightDates?: { date: Date; price: number | null; isSoldOut?: boolean }[];
}

const DatePicker: React.FC<DatePickerProps> = ({ 
    selectedDate, 
    onDateSelect, 
    selectableDays, 
    minDaysFromToday = 0, 
    specialDateGroups = [],
    soldOutDates = [],
    highlightDates,
}) => {
    const isSameDay = (d1: Date, d2: Date | null) => 
        d1 && d2 &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    // New logic for Special Dates Tab view (for Punta Sal)
    const isSpecialDatePicker = specialDateGroups.length > 0;

    const monthlyGroupedDates = useMemo(() => {
        if (!isSpecialDatePicker) return {};

        const groups: { [monthYear: string]: { date: Date; price: number | null; isSoldOut: boolean }[] } = {};

        const allDates = [
            ...specialDateGroups.flatMap(g => g.dates.map(d => ({ date: d, price: g.price, isSoldOut: false }))),
            ...soldOutDates.map(d => ({ date: d, price: null, isSoldOut: true }))
        ];

        allDates.forEach(({ date, price, isSoldOut }) => {
            const monthYear = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            if (!groups[monthYear]) {
                groups[monthYear] = [];
            }
            groups[monthYear].push({ date, price, isSoldOut });
        });
        
        for (const month in groups) {
            groups[month].sort((a, b) => a.date.getTime() - b.date.getTime());
        }

        return groups;
    }, [specialDateGroups, soldOutDates, isSpecialDatePicker]);

    const availableMonths = useMemo(() => Object.keys(monthlyGroupedDates), [monthlyGroupedDates]);
    
    const [activeMonth, setActiveMonth] = useState(availableMonths.length > 0 ? availableMonths[0] : '');

    useEffect(() => {
      if (!isSpecialDatePicker) return;

      if (selectedDate) {
        const monthYear = selectedDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        if (availableMonths.includes(monthYear)) {
          setActiveMonth(monthYear);
        }
      } else if (availableMonths.length > 0) {
        setActiveMonth(availableMonths[0]);
      }
    }, [selectedDate, availableMonths, isSpecialDatePicker]);
    
    if (isSpecialDatePicker) {
        if (availableMonths.length === 0) {
            return (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CalendarIcon className="h-6 w-6 text-gray-500" />
                        <span>Elige tu fecha de Salida</span>
                    </h3>
                    <p>No hay fechas promocionales disponibles por el momento.</p>
                </div>
            );
        }

        return (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-6 w-6 text-gray-500" />
                    <span>Elige tu fecha de Salida</span>
                </h3>
                
                <div className="flex border-b border-gray-300 mb-4 -mx-6 px-4 overflow-x-auto">
                    {availableMonths.map(month => (
                        <button
                            key={month}
                            onClick={() => setActiveMonth(month)}
                            className={`capitalize px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                activeMonth === month 
                                ? 'border-b-2 border-[#1856C5] text-[#1856C5]' 
                                : 'text-gray-500 hover:text-gray-800 border-b-2 border-transparent'
                            }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>

                <div className="space-y-2 max-h-[25rem] overflow-y-auto pr-2">
                    {monthlyGroupedDates[activeMonth]?.map(({ date, price, isSoldOut }, index) => {
                        const isSelected = isSameDay(date, selectedDate);
                        
                        const buttonClasses = `w-full text-left p-3 rounded-lg flex justify-between items-center transition-all duration-200 border ${
                            isSelected 
                                ? 'bg-[#1856C5] text-white border-[#1856C5] shadow-md' 
                                : isSoldOut 
                                ? 'bg-red-50 border-red-200 text-red-500 cursor-not-allowed'
                                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                        }`;

                        return (
                            <button
                                key={index}
                                onClick={() => !isSoldOut && onDateSelect(date)}
                                disabled={isSoldOut}
                                className={buttonClasses}
                            >
                                <span className="font-semibold capitalize">
                                    {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })}
                                </span>
                                {isSoldOut ? (
                                    <span className="text-xs font-bold uppercase">Agotado</span>
                                ) : (
                                    <span className="font-bold text-lg">${price}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
    
    // --- Fallback to Original Calendar View (for Cusco/Iquitos and custom date mode) ---
    const getInitialDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + minDaysFromToday);
        return minDate;
    };
    
    const [minSelectableDate] = useState(getInitialDate);
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate || minSelectableDate));

    const highlightsMap = useMemo(() => {
        if (!highlightDates) return new Map();
        const map = new Map<string, { price: number | null; isSoldOut?: boolean }>();
        highlightDates.forEach(d => {
            const key = d.date.toDateString();
            map.set(key, { price: d.price, isSoldOut: d.isSoldOut });
        });
        return map;
    }, [highlightDates]);

    useEffect(() => {
        if(selectedDate) {
            setCurrentDate(new Date(selectedDate));
        } else {
            setCurrentDate(new Date(minSelectableDate));
        }
    }, [selectedDate, minSelectableDate]);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const days: Date[] = [];
    let day = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
        days.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-gray-500" />
                <span>Elige tu fecha de Salida</span>
            </h3>

            <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={handlePrevMonth} 
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50" 
                  aria-label="Mes anterior"
                  disabled={currentDate.getFullYear() === minSelectableDate.getFullYear() && currentDate.getMonth() <= minSelectableDate.getMonth()}
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <span className="font-semibold text-lg capitalize">
                    {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200" aria-label="Mes siguiente">
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => {
                    const isCurrentMonth = d.getMonth() === currentDate.getMonth();
                    const dayHighlight = highlightsMap.get(d.toDateString());
                    const isSoldOut = dayHighlight?.isSoldOut ?? false;
                    
                    const isSelectable = (!selectableDays || selectableDays.includes(d.getDay())) && d >= minSelectableDate && !isSoldOut;
                    const isSelected = selectedDate && isSameDay(d, selectedDate);
                    
                    // Use flex-col to stack date and price vertically
                    let buttonClasses = "w-10 h-10 flex flex-col items-center justify-center rounded-full transition-colors relative text-sm ";

                    if (!isCurrentMonth) {
                        buttonClasses += "text-gray-300";
                    } else if (isSelected) {
                        buttonClasses += "bg-[#1856C5] text-white font-bold";
                    } else if (isSoldOut) {
                        buttonClasses += "text-red-400 line-through cursor-not-allowed bg-red-50";
                    } else if (isSelectable) {
                        buttonClasses += "hover:bg-blue-100 cursor-pointer";
                         if(dayHighlight?.price) {
                            // Add a soft background for dates with special prices
                            buttonClasses += " border border-blue-300 bg-blue-50/50";
                        }
                    } else {
                        buttonClasses += "text-gray-400 cursor-not-allowed";
                    }

                    // Soften date color if a price exists, as requested
                    const dateNumberColor = isSelected ? '' : dayHighlight?.price ? 'text-gray-500' : 'text-gray-800';
                    const priceColor = isSelected ? 'text-white/80' : 'text-blue-600';


                    return (
                        <button 
                            key={i} 
                            disabled={!isSelectable || !isCurrentMonth}
                            onClick={() => onDateSelect(d)}
                            className={buttonClasses}
                        >
                            <span className={`leading-none ${dateNumberColor}`}>{d.getDate()}</span>
                            {isCurrentMonth && dayHighlight?.price && !isSoldOut && (
                                <span className={`text-[10px] font-bold leading-none mt-0.5 ${priceColor}`}>${dayHighlight.price}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DatePicker;