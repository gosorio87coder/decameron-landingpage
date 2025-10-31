import React from 'react';
import AccordionItem from '../components/AccordionItem';
import { PlaneIcon, HotelIcon, GuideIcon, LandmarkIcon, TicketIcon } from '../components/icons/FeatureIcons';
import { QuoteDetails } from '../types';

const galleryImages = [
    'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549144511-b593605a3923?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543783204-4e1b38722583?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=2070&auto=format&fit=crop'
];

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - Madrid - Lima' },
    { icon: <HotelIcon />, text: '15 Noches de alojamiento con desayuno' },
    { icon: <GuideIcon />, text: 'Traslados y transporte en bus turístico' },
    { icon: <LandmarkIcon />, text: 'Visitas panorámicas en ciudades principales' },
    { icon: <GuideIcon />, text: 'Guía acompañante durante todo el circuito' },
    { icon: <TicketIcon />, text: 'Visita a la Basílica de Nuestra Señora del Pilar' },
];

const itinerary = [
    { title: 'Día 1: Lima - Madrid', content: 'Presentación en el aeropuerto Jorge Chávez para abordar el vuelo hacia Madrid. Noche a bordo.' },
    { title: 'Día 2: Madrid', content: 'Llegada a Madrid-Barajas. Asistencia y traslado al hotel. Alojamiento y resto del día libre.' },
    { title: 'Día 3: Madrid', content: 'Alojamiento y desayuno. Por la mañana, visita panorámica de la ciudad. Resto del día libre. Opcional: excursión a Toledo.' },
    { title: 'Día 4: Madrid - Zaragoza - Barcelona', content: 'Desayuno. Salida hacia Zaragoza para conocer la Basílica del Pilar. Continuación a Barcelona. Breve recorrido panorámico y alojamiento.' },
    { title: 'Día 5: Barcelona - Niza', content: 'Desayuno. Salida por la Costa Azul hacia Niza. Alojamiento. Opcional: excursión al Principado de Mónaco y Montecarlo.' },
    { title: 'Día 6: Niza - Pisa - Roma', content: 'Desayuno. Salida hacia Pisa para ver la famosa Torre Inclinada en la Plaza de los Milagros. Continuación a Roma. Alojamiento.' },
    { title: 'Día 7: Roma', content: 'Alojamiento y desayuno. Visita panorámica de la Roma Imperial. Asistencia a la AUDIENCIA PAPAL (si está disponible). Opcional: Museos Vaticanos y Roma Barroca.' },
    { title: 'Día 8: Roma', content: 'Alojamiento y desayuno. Día libre. Opcional: excursión a Nápoles, Capri y Pompeya.' },
    { title: 'Día 9: Roma - Florencia', content: 'Desayuno. Salida hacia Florencia. Visita a pie para conocer la Catedral, el Baptisterio, la Plaza de la Signoría y el Ponte Vecchio. Alojamiento.' },
    { title: 'Día 10: Florencia - Venecia', content: 'Desayuno. Salida a Venecia. Llegada y visita panorámica a pie de la Plaza de San Marcos. Tiempo libre. Opcional: paseo en Góndola. Alojamiento.' },
    { title: 'Día 11: Venecia - Lucerna - Zurich', content: 'Desayuno. Salida hacia Suiza. Parada en Lucerna. Opcional: excursión alpina a Klewenalp-Stockhütte. Continuación a Zúrich. Alojamiento.' },
    { title: 'Día 12: Zurich - Basilea - París', content: 'Desayuno. Salida hacia Basilea para tiempo libre. Continuación a París. Alojamiento. Opcional: París Iluminado.' },
    { title: 'Día 13: París', content: 'Alojamiento y desayuno. Visita panorámica de la Ciudad Luz. Tarde libre. Opcional: Palacio de Versalles o espectáculos nocturnos.' },
    { title: 'Día 14: París', content: 'Alojamiento y desayuno. Día libre. Opcionales: Montmartre, crucero por el Sena o excursión a Brujas (Bélgica).' },
    { title: 'Día 15: París - Valle del Loira - Burdeos', content: 'Desayuno. Salida hacia el Valle del Loira con parada en Blois. Continuación a Burdeos. Alojamiento.' },
    { title: 'Día 16: Burdeos - Madrid', content: 'Desayuno. Salida de regreso a Madrid vía San Sebastián y Burgos. Alojamiento.' },
    { title: 'Día 17: Madrid - Lima', content: 'Desayuno. A la hora indicada, traslado al aeropuerto para el vuelo de regreso a Lima. Fin de los servicios.' },
];

const importantNotes = [
    "Los precios indicados son informativos y deben ser confirmados al reservar, sujetos a modificaciones.",
    "Tarifa aplica para pago en dólares americanos, según la liquidación enviada.",
    "Bajo solicitud, sujeto a disponibilidad y posible cambio de tarifa.",
    "Habitaciones triples incluyen una cama supletoria tipo rollaway, sujeta a disponibilidad.",
    "Tarifa de infante (0-1 año): paga el 10% del valor del paquete, compartiendo con 2 pasajeros adultos.",
    "Salida del 18 de diciembre no incluye cena de Noche Buena ni de fin de año.",
    "Cualquier alza en tasas e impuestos aéreos deberá ser asumida por el pasajero.",
];

interface EuropaPageProps {
  onOpenQuote: (details?: QuoteDetails) => void;
}

const EuropaPage: React.FC<EuropaPageProps> = ({ onOpenQuote }) => {
    const basePrice = 3299;

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758721223/paquete-viaje-europa-inolvidable-ano-nuevo-2025_1_zbs4dk.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Europa Inolvidable</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">Un viaje épico por las capitales que definieron la historia.</p>
                </div>
            </section>

             <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">Postales de Europa</h2>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {galleryImages.map((src, index) => (
                            <img key={index} src={src} alt={`Europa view ${index + 1}`} className="w-80 h-60 object-cover rounded-lg shadow-md flex-shrink-0" />
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu gran tour europeo?</h2>
                            <div className="grid sm:grid-cols-2 gap-6 mt-6">
                                {inclusions.map((item, index) => (
                                    <div key={index} className="flex items-center bg-blue-50/50 p-4 rounded-lg">
                                        {React.cloneElement(item.icon, { className: 'h-8 w-8 text-[#1856C5] flex-shrink-0' })}
                                        <span className="ml-4 text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Itinerario Detallado</h2>
                            <div className="space-y-4">
                                {itinerary.map((item, index) => (
                                    <AccordionItem key={index} title={item.title} content={item.content} />
                                ))}
                            </div>
                        </section>

                         <section className="mb-12">
                             <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Vuelos y Hoteles</h2>
                             <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6 border">
                                    <h3 className="font-bold text-lg mb-2">Itinerario Aéreo con Air Europa</h3>
                                    <p><span className="font-semibold">UX176:</span> Lima - Madrid (10:20 - 05:10+1)</p>
                                    <p><span className="font-semibold">UX175:</span> Madrid - Lima (23:45 - 04:20+1)</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 border">
                                    <h3 className="font-bold text-lg mb-2">Hoteles Previstos o Similares</h3>
                                    <ul className="list-disc list-inside text-gray-700">
                                      <li><span className="font-semibold">Madrid:</span> Hotel Praga (Primera)</li>
                                      <li><span className="font-semibold">Barcelona:</span> Hesperia Barcelona Sant Just (Primera)</li>
                                      <li><span className="font-semibold">Niza:</span> Ibis Nice Aeroport (Turista)</li>
                                      <li><span className="font-semibold">Roma:</span> Grand Hotel Fleming (Primera)</li>
                                      <li><span className="font-semibold">Florencia:</span> Mirage (Turista)</li>
                                      <li><span className="font-semibold">Venecia:</span> Albatros Venecia (Primera)</li>
                                      <li><span className="font-semibold">Zúrich:</span> Novotel Zurich Airport Messe (Primera)</li>
                                      <li><span className="font-semibold">París:</span> Ibis Paris la Villette (Primera)</li>
                                      <li><span className="font-semibold">Burdeos:</span> B&B Bordeaux les Begles (Turista)</li>
                                    </ul>
                                </div>
                             </div>
                         </section>

                    </div>

                    <aside>
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                                <p className="text-lg text-gray-600">Salida Especial Fin de Año</p>
                                <p className="text-2xl font-bold text-[#0D2B5B] my-2">18 de Diciembre 2025</p>
                                <hr className="my-4"/>
                                <p className="text-sm text-gray-600">Precio por persona</p>
                                <p className="text-5xl font-extrabold text-[#0D2B5B]">US$ {basePrice}</p>
                                <p className="text-xs text-gray-500">En acomodación DBL</p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="text-xl font-bold mb-4">Notas Importantes</h3>
                                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
                                    {importantNotes.map((note, index) => (
                                        <li key={index}>{note}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="sticky bottom-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 z-40">
                <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p className="text-sm text-gray-600">Precio por persona desde</p>
                        <p className="text-3xl font-extrabold text-[#0D2B5B]">US$ {basePrice.toLocaleString('en-US')}</p>
                    </div>
                    <button
                        onClick={() => onOpenQuote()}
                        className="bg-[#FBBF24] text-[#0D2B5B] w-full sm:w-auto font-bold py-4 px-10 rounded-lg hover:bg-amber-300 transition-colors duration-300 text-lg shadow-md"
                    >
                        Consultar Disponibilidad
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EuropaPage;
