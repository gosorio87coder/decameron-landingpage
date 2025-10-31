import React, { useState } from 'react';
import AccordionItem from '../components/AccordionItem';
import DatePicker from '../components/DatePicker';
import { PlaneIcon, HotelIcon, GuideIcon, TrainIcon, TicketIcon } from '../components/icons/FeatureIcons';
import { QuoteDetails } from '../types';

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - Cusco - Lima' },
    { icon: <GuideIcon />, text: 'Traslados aeropuerto - hotel - aeropuerto' },
    { icon: <HotelIcon />, text: '03 noches de alojamiento en Cusco' },
    { icon: <TrainIcon />, text: 'Tour a Machu Picchu en tren Expedition' },
    { icon: <GuideIcon />, text: 'City Tour y excursión al Valle Sagrado' },
    { icon: <TicketIcon />, text: 'Boletos de ingreso a los atractivos' },
];

const itinerary = [
    { title: 'Día 1: Arribo a Cusco y City Tour', content: 'Recepción en el aeropuerto de Cusco y traslado a su hotel. Por la tarde, iniciaremos el City Tour visitando la Catedral, el Templo del Sol (Qoricancha) y los centros arqueológicos de Sacsayhuamán, Q\'enqo, Puka Pukara y Tambomachay. Noche en Cusco.' },
    { title: 'Día 2: El Valle Sagrado de los Incas', content: 'Excursión de día completo al Valle Sagrado. Visitaremos el colorido mercado de Pisac y su centro arqueológico. Disfrutaremos de un almuerzo buffet en Urubamba. Por la tarde, exploraremos la fortaleza y ciudadela de Ollantaytambo. El tour finaliza en la estación de tren para abordar el tren hacia Aguas Calientes. Noche en Aguas Calientes.' },
    { title: 'Día 3: La Ciudadela de Machu Picchu', content: 'Muy temprano, tomaremos el bus hacia la ciudadela de Machu Picchu. Tendremos una visita guiada por sus principales templos y terrazas. Tiempo libre para explorar por su cuenta. Por la tarde, abordaremos el tren de regreso a Ollantaytambo y luego un bus nos llevará de vuelta a Cusco. Noche en Cusco.' },
    { title: 'Día 4: Despedida de la Ciudad Imperial', content: 'Desayuno en el hotel. A la hora coordinada, traslado al aeropuerto para su vuelo de regreso a Lima. Fin de nuestros servicios.' },
];

const addons = [
    { id: 1, name: 'Upgrade a tren Vistadome', description: 'Disfruta de vistas panorámicas en tu viaje a Machu Picchu.', price: 75 },
    { id: 2, name: 'Tour a Montaña de 7 Colores', description: 'Excursión de día completo a Vinicunca (requiere día extra).', price: 60 },
    { id: 3, name: 'Tour a Laguna Humantay', description: 'Caminata a una de las joyas turquesas de los Andes.', price: 55 },
    { id: 4, name: 'Noche Adicional en Aguas Calientes', description: 'Disfruta con más calma del pueblo y sus aguas termales.', price: 90 },
];

interface CuscoPageProps {
  onOpenQuote: (details?: QuoteDetails) => void;
}

const CuscoPage: React.FC<CuscoPageProps> = ({ onOpenQuote }) => {
    const basePrice = 399;
    const [selectedAddons, setSelectedAddons] = useState<typeof addons[0][]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleAddonChange = (addon: typeof addons[0]) => {
        setSelectedAddons(prev =>
            prev.some(a => a.id === addon.id)
                ? prev.filter(a => a.id !== addon.id)
                : [...prev, addon]
        );
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const totalAddonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = basePrice + totalAddonsPrice;

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758720006/voyana-cusco-machu-picchu-card-3x4-v3_rxrcoo.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Cusco Mágico</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">El ombligo del mundo y sus maravillas te esperan.</p>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu aventura andina?</h2>
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
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Itinerario Detallado</h2>
                            <div className="space-y-4">
                                {itinerary.map((item, index) => (
                                    <AccordionItem key={index} title={item.title} content={item.content} />
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside>
                        <div className="sticky top-28 space-y-8">
                           <DatePicker 
                                selectedDate={selectedDate} 
                                onDateSelect={handleDateSelect}
                                selectableDays={[0, 1, 2, 3, 4, 5, 6]}
                                minDaysFromToday={15}
                            />
                            
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h3 className="text-xl font-bold mb-4">Mejora Tu Viaje</h3>
                                <div className="space-y-4">
                                    {addons.map(addon => (
                                        <div key={addon.id} className="flex items-center justify-between">
                                            <div>
                                                <label htmlFor={`addon-cu-${addon.id}`} className="font-semibold text-gray-800">{addon.name}</label>
                                                <p className="text-sm text-gray-500">{addon.description}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className="font-bold text-[#0D2B5B]">${addon.price}</span>
                                                <input
                                                  type="checkbox"
                                                  id={`addon-cu-${addon.id}`}
                                                  checked={selectedAddons.some(a => a.id === addon.id)}
                                                  onChange={() => handleAddonChange(addon)}
                                                  className="w-5 h-5 text-[#1856C5] bg-gray-100 border-gray-300 rounded focus:ring-[#1856C5] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="sticky bottom-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 z-40">
                <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p className="text-sm text-gray-600">Precio por persona desde</p>
                        <p className="text-3xl font-extrabold text-[#0D2B5B]">US$ {totalPrice.toLocaleString('en-US')}</p>
                        {selectedAddons.length > 0 && (
                            <p className="text-xs text-green-600 font-semibold">+ ${totalAddonsPrice} en adicionales</p>
                        )}
                    </div>
                    <button
                        onClick={() => onOpenQuote()}
                        className="bg-[#FBBF24] text-[#0D2B5B] w-full sm:w-auto font-bold py-4 px-10 rounded-lg hover:bg-amber-300 transition-colors duration-300 text-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={!selectedDate}
                    >
                        Pre-Reservar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CuscoPage;
