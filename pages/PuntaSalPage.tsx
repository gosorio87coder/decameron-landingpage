import React, { useState, useEffect, useMemo } from 'react';
import AccordionItem from '../components/AccordionItem';
import PassengerInfoModal from '../components/PassengerInfoModal';
import DatePicker from '../components/DatePicker';
import { PlaneIcon, HotelIcon, FoodIcon, GuideIcon, BriefcaseIcon, WhatsAppIcon, CalendarIcon } from '../components/icons/FeatureIcons';
import { QuoteDetails } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

const galleryImages = [
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758723079/paquete-todo-incluido-decameron-punta-sal-voyana_i6y8l5.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758734015/resort-decameron-voyanaamigos-piscina-cocteles_urhklo.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758731259/decameron-punta-sal-frutas-hamburguesa-16x9_nafb56.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758732925/habitacion-decameron-punta-sal-voyana_vsldnc.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758731258/decameron-punta-sal-carne-postre-16x9_l7ocyp.webp',
];

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - Tumbes - Lima (LATAM)' },
    { icon: <BriefcaseIcon />, text: 'Equipaje: Mochila + Carry On por persona' },
    { icon: <GuideIcon />, text: 'Traslados compartidos aeropuerto - hotel - aeropuerto' },
    { icon: <HotelIcon />, text: '03 noches de alojamiento en Hotel Royal Decameron Punta Sal' },
    { icon: <FoodIcon />, text: 'Sistema todo incluido: desayunos, almuerzos y cenas tipo buffet' },
];

const itinerary = [
    { title: 'Día 1: Bienvenida a Punta Sal', content: 'Recojo en el aeropuerto de Tumbes con un letrero con el nombre del pasajero principal. Traslado directo al hotel Royal Decameron. Día libre para disfrutar de las instalaciones y la playa. Cena buffet y show nocturno.' },
    { title: 'Día 2: Relax y Sol en el Resort', content: 'Desayuno buffet. Disfruta de las instalaciones del hotel que incluyen 5 piscinas, gimnasio y acceso directo a la playa. Almuerzo y snacks durante el día. Por la noche, la cena es en restaurantes de especialidades (previa reserva) y luego puedes unirte al karaoke o shows en vivo.' },
    { title: 'Día 3: Aventura y Diversión', content: 'Desayuno buffet. Día libre para relajarte o tomar una de nuestras excursiones adicionales. Disfruta de las bebidas ilimitadas en los diferentes bares del resort, participa en las actividades de animación o simplemente descansa en la playa. Cena buffet y noche de discoteca.' },
    { title: 'Día 4: Despedida con Sabor', content: 'Desayuno buffet. Mañana libre para un último chapuzón. El check-out de la habitación es a las 12:00 p.m. Podrás disfrutar del almuerzo buffet y las instalaciones hasta las 3:00 p.m., hora programada para el traslado de salida hacia el aeropuerto de Tumbes.' },
];

const getPromoDates = (): Date[] => [
    new Date(2025, 11, 2), new Date(2025, 11, 3), new Date(2025, 11, 10), new Date(2025, 11, 14),
    new Date(2026, 2, 7), new Date(2026, 2, 8), new Date(2026, 2, 9), new Date(2026, 2, 10),
    new Date(2026, 2, 11), new Date(2026, 2, 14), new Date(2026, 2, 15), new Date(2026, 2, 16),
    new Date(2026, 2, 17), new Date(2026, 2, 18), new Date(2026, 2, 21), new Date(2026, 2, 22),
    new Date(2026, 2, 28),
];
    
const getHighSeasonDates = (): Date[] => [
    new Date(2025, 11, 13), new Date(2025, 11, 21),
    new Date(2026, 2, 12), new Date(2026, 2, 13), new Date(2026, 2, 19),
    new Date(2026, 2, 23), new Date(2026, 2, 24), new Date(2026, 2, 25),
    new Date(2026, 2, 26), new Date(2026, 2, 27),
];

const getSuperHighSeasonDates = (): Date[] => [
    new Date(2025, 11, 1), new Date(2025, 11, 9), new Date(2025, 11, 11), new Date(2025, 11, 15), new Date(2025, 11, 16),
    new Date(2026, 0, 20), new Date(2026, 0, 27),
    new Date(2026, 1, 3), new Date(2026, 1, 8), new Date(2026, 1, 10), new Date(2026, 1, 17),
    new Date(2026, 1, 22), new Date(2026, 1, 23), new Date(2026, 1, 24), new Date(2026, 1, 25), new Date(2026, 1, 28),
    new Date(2026, 2, 1),
];

const getSoldOutDates = (): Date[] => [
    new Date(2025, 11, 29), new Date(2025, 11, 30), new Date(2025, 11, 31),
];

interface PuntaSalPageProps {
  onOpenQuote: (details: QuoteDetails) => void;
}

const PuntaSalPage: React.FC<PuntaSalPageProps> = ({ onOpenQuote }) => {
    const promoPrice = 599;
    const highSeasonPrice = 669;
    const superHighSeasonPrice = 719;

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
    const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
    const [monthFilter, setMonthFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState(599);
    const [isCustomDateMode, setIsCustomDateMode] = useState(false);
    
    useEffect(() => {
        if (selectedDate && adults < 2) {
            setAdults(2);
        }
    }, [selectedDate, adults]);

    const isSameDay = (d1: Date, d2: Date | null) => 
        d1 && d2 &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
        
    const specialDateGroups = useMemo(() => [
        { label: `Fechas Promocionales`, price: promoPrice, dates: getPromoDates() },
        { label: `Fechas Especiales`, price: highSeasonPrice, dates: getHighSeasonDates() },
        { label: `Fechas Fin de Año`, price: superHighSeasonPrice, dates: getSuperHighSeasonDates() },
    ], [promoPrice, highSeasonPrice, superHighSeasonPrice]);

    const allSpecialDates = useMemo(() => {
        return specialDateGroups.flatMap(group => 
            group.dates.map(date => ({ date, price: group.price }))
        ).sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [specialDateGroups]);

    const availableMonths = useMemo(() => {
        const months = new Set<string>();
        allSpecialDates.forEach(({ date }) => {
            const monthName = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            months.add(monthName.charAt(0).toUpperCase() + monthName.slice(1));
        });
        return Array.from(months);
    }, [allSpecialDates]);

    const availablePrices = useMemo(() => {
        const prices = new Set<number>();
        allSpecialDates.forEach(({ price }) => {
            prices.add(price);
        });
        return Array.from(prices).sort((a, b) => a - b);
    }, [allSpecialDates]);

    const filteredDates = useMemo(() => {
        return allSpecialDates.filter(({ date, price }) => {
            const monthName = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

            const monthMatch = monthFilter === 'all' || capitalizedMonth === monthFilter;
            const priceMatch = priceFilter === 0 || price === priceFilter;
            return monthMatch && priceMatch;
        });
    }, [allSpecialDates, monthFilter, priceFilter]);
    
    const soldOutDates = getSoldOutDates();

    const highlightDates = useMemo(() => {
        const soldOuts = soldOutDates.map(d => ({ date: d, price: null, isSoldOut: true }));
        return [...allSpecialDates, ...soldOuts];
    }, [allSpecialDates, soldOutDates]);

    const isSoldOut = selectedDate ? soldOutDates.some(d => isSameDay(d, selectedDate)) : false;

    const currentPrice = useMemo(() => {
        if (!selectedDate) return 0;
        const foundDate = allSpecialDates.find(d => isSameDay(d.date, selectedDate));
        return foundDate ? foundDate.price : 0;
    }, [selectedDate, allSpecialDates]);

    const isSpecialDate = currentPrice > 0;
    const passengerCount = adults + children;
    const totalPrice = (passengerCount * currentPrice);

    const handlePreBook = () => {
        if (!selectedDate || !isSpecialDate) return;
        const details: QuoteDetails = {
            packageName: 'Decameron Punta Sal',
            departureDate: selectedDate,
            adults,
            children,
            infants,
            totalPrice,
            addons: [],
        };
        setQuoteDetails(details);
        setIsPassengerModalOpen(true);
    };

    const handleRequestQuoteViaWhatsapp = () => {
        if (!selectedDate) return;
        const message = `¡Hola Voyana! Quisiera cotizar un viaje a Decameron Punta Sal para el ${selectedDate.toLocaleDateString('es-ES')}. Somos ${adults} adultos, ${children} niños y ${infants} infantes. ¡Gracias!`;
        const phoneNumber = WHATSAPP_NUMBER;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleCustomDateToggle = (checked: boolean) => {
        setIsCustomDateMode(checked);
        if (!checked) {
            const isCurrentDateSpecial = allSpecialDates.some(d => isSameDay(d.date, selectedDate));
            if (!isCurrentDateSpecial) {
                setSelectedDate(null);
            }
        }
    };

    const handleCustomDateSelect = (date: Date) => {
        const specialDateMatch = allSpecialDates.find(d => isSameDay(d.date, date));
        if (specialDateMatch) {
            setSelectedDate(date);
            setIsCustomDateMode(false);
            setPriceFilter(specialDateMatch.price);
            const monthName = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
            const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
            setMonthFilter(capitalizedMonth);
        } else {
            setSelectedDate(date);
        }
    };


    const counterButtonClasses = "w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold text-[#0D2B5B] disabled:opacity-50";

    const renderCtaButton = () => {
        if (isSoldOut) {
            return (
                <button disabled className="bg-red-500 text-white w-full font-bold py-4 px-10 rounded-lg text-lg mt-4 cursor-not-allowed">
                    Fechas Agotadas
                </button>
            );
        }
        if (isSpecialDate) {
             return (
                <button onClick={handlePreBook} className="bg-[#facc15] text-[#0D2B5B] w-full font-bold py-4 px-10 rounded-lg hover:bg-[#eab308] transition-colors duration-300 text-lg mt-4">
                    Pre-Reservar Ahora
                </button>
            );
        }
        if (selectedDate) {
            return (
                 <button onClick={handleRequestQuoteViaWhatsapp} className="bg-green-500 text-white w-full font-bold py-4 px-10 rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg mt-4 flex items-center justify-center gap-2">
                    <WhatsAppIcon className="h-6 w-6" />
                    Cotiza con Agente Voyana
                </button>
            )
        }
        return null; // No button if no date is selected
    };

    const returnDate = useMemo(() => {
        if (!selectedDate) return null;
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 3);
        return date;
    }, [selectedDate]);

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758723079/paquete-todo-incluido-decameron-punta-sal-voyana_i6y8l5.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Decameron Punta Sal</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">La experiencia todo incluido que mereces.</p>
                </div>
            </section>
            
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">Galería de Destinos</h2>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {galleryImages.map((src, index) => (
                            <img key={index} src={src} alt={`Punta Sal view ${index + 1}`} className="w-80 h-60 object-cover rounded-lg shadow-md flex-shrink-0" />
                        ))}
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu paquete?</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {inclusions.map((item, index) => (
                                    <div key={index} className="flex items-center bg-blue-50/50 p-4 rounded-lg">
                                        {React.cloneElement(item.icon, { className: 'h-8 w-8 text-[#1856C5] flex-shrink-0' })}
                                        <span className="ml-4 text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Itinerario Día a Día</h2>
                            <div className="space-y-4">
                                {itinerary.map((item, index) => (
                                    <AccordionItem key={index} title={item.title} content={item.content} />
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside>
                        <div className="sticky top-28 space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                            <h3 className="text-xl font-bold">Elige tu fecha de Salida</h3>
                            
                            {!isCustomDateMode ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700">Mes</label>
                                            <select id="month-filter" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                <option value="all">Todos</option>
                                                {availableMonths.map(month => <option key={month} value={month}>{month}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700">Precio por persona</label>
                                            <select id="price-filter" value={priceFilter} onChange={(e) => setPriceFilter(Number(e.target.value))} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                                <option value={0}>Todos</option>
                                                {availablePrices.map(price => <option key={price} value={price}>${price}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 mt-4 border-t pt-4">
                                        {filteredDates.length > 0 ? filteredDates.map(({ date, price }) => {
                                            const isSelected = isSameDay(date, selectedDate);
                                            return (
                                                <button key={date.toISOString()} onClick={() => setSelectedDate(date)} className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition-all duration-200 border ${isSelected ? 'bg-[#1856C5] text-white border-[#1856C5] shadow-md' : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'}`}>
                                                    <span className="font-semibold">{date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
                                                    <span className="font-bold text-lg">${price}</span>
                                                </button>
                                            )
                                        }) : <p className="text-gray-500 text-center py-4">No hay fechas con los filtros seleccionados.</p>}
                                    </div>
                                </>
                            ) : (
                                <div className="mt-2">
                                    <DatePicker
                                        selectedDate={selectedDate}
                                        onDateSelect={handleCustomDateSelect}
                                        minDaysFromToday={15}
                                        highlightDates={highlightDates}
                                    />
                                </div>
                            )}

                             <div className="flex items-center gap-2 pt-4 border-t">
                                <input 
                                    type="checkbox" 
                                    id="custom-date-mode"
                                    checked={isCustomDateMode}
                                    onChange={(e) => handleCustomDateToggle(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="custom-date-mode" className="text-sm font-medium text-gray-700">Quiero otra fecha</label>
                            </div>


                            {selectedDate && (
                                <div className="animate-fade-in space-y-6 pt-6 border-t">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="adults-count" className="font-semibold text-gray-800">Adultos</label>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => setAdults(a => Math.max(2, a - 1))} disabled={adults <= 2} className={counterButtonClasses}>-</button>
                                                <span id="adults-count" className="w-4 text-center font-semibold">{adults}</span>
                                                <button onClick={() => setAdults(a => a + 1)} className={counterButtonClasses}>+</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="children-count" className="font-semibold text-gray-800">Niños (2-11)</label>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => setChildren(c => Math.max(0, c - 1))} disabled={children <= 0} className={counterButtonClasses}>-</button>
                                                <span id="children-count" className="w-4 text-center font-semibold">{children}</span>
                                                <button onClick={() => setChildren(c => c + 1)} className={counterButtonClasses}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {isSpecialDate && (
                                    <>
                                    <div className="pt-6 border-t">
                                        <h3 className="text-xl font-bold mb-4">Resumen del Viaje</h3>
                                        <div className="space-y-3 text-gray-700">
                                            <div className="flex items-center gap-3">
                                                <CalendarIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                                                <span>Salida: {selectedDate.toLocaleDateString('es-ES')} - Retorno: {returnDate?.toLocaleDateString('es-ES')}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FoodIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                                                <span>Sistema Todo Incluido</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <GuideIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                                                <span>Incluye Traslados</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <PlaneIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                                                <span>Boletos Lima - Tumbes - Lima (LATAM)</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <BriefcaseIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
                                                <span>Incluye Mochila y Carry On</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-6 border-t text-center">
                                        <p className="text-sm text-gray-600">Precio total a pagar estimado</p>
                                        <p className="text-3xl font-extrabold text-[#0D2B5B]">US$ {totalPrice.toLocaleString('en-US')}</p>
                                    </div>
                                    </>
                                    )}

                                    {!isSpecialDate && (
                                         <div className="text-center text-sm text-gray-600 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            Un asesor te contactará con una cotización personalizada para la fecha seleccionada.
                                        </div>
                                    )}

                                    {renderCtaButton()}
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            <PassengerInfoModal 
                isOpen={isPassengerModalOpen} 
                onClose={() => setIsPassengerModalOpen(false)} 
                details={quoteDetails} 
            />
        </div>
    );
};

export default PuntaSalPage;