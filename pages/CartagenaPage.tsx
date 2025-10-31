import React from 'react';
import AccordionItem from '../components/AccordionItem';
import { PlaneIcon, HotelIcon, FoodIcon, GuideIcon, ShipIcon, BusIcon } from '../components/icons/FeatureIcons';
import { QuoteDetails } from '../types';

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - Cartagena - Lima' },
    { icon: <GuideIcon />, text: 'Traslados aeropuerto - hotel - aeropuerto' },
    { icon: <HotelIcon />, text: '04 noches de alojamiento' },
    { icon: <FoodIcon />, text: 'Sistema de alimentación con Desayunos' },
    { icon: <GuideIcon />, text: 'City tour histórico con Castillo San Felipe' },
    { icon: <BusIcon />, text: 'Tour nocturno en Chiva (Cortesía)' },
];

const itinerary = [
    { title: 'Día 1: Lima – Cartagena', content: 'Presentarse con tres horas de anticipación en el aeropuerto Jorge Chávez de Lima para tomar el vuelo con destino a Cartagena de Indias. Llegada al aeropuerto Rafael Núñez, recojo y traslado al hotel. Alojamiento.' },
    { title: 'Día 2: City Tour Histórico', content: 'Desayuno. A la hora oportuna, nos dirigimos al parque Flanagan para iniciar el recorrido por la ciudad: La bahía de Cartagena, torre del reloj, muelle de pegasos, centro de convenciones, bahía de manga, zapatos viejos, india Catalina, Marbella, castillo San Felipe (ingreso incluido) y una caminata por el centro histórico.' },
    { title: 'Día 3: Día Libre en Cartagena', content: 'Desayuno en el hotel. Día libre para actividades por cuenta propia, disfrutar de la playa o tomar un tour opcional.' },
    { title: 'Día 4: Tour Nocturno en Chiva', content: 'Desayuno. Día libre. Por la noche, disfruta de un tour nocturno en una pintoresca Chiva con música a bordo, recorriendo los principales sectores turísticos y haciendo paradas en el “Monumento de los zapatos viejos” y frente al “Castillo San Felipe" para fotos.' },
    { title: 'Día 5: Cartagena – Lima', content: 'Desayuno en el hotel. A la hora coordinada, traslado al aeropuerto para tomar el vuelo de regreso a Lima. Fin de los servicios.' },
];

const importantNotes = [
    "Niños de 2-11 años comparten habitación con los padres.",
    "Infantes (0-1 año) pagan 10% de la tarifa adulto, sin derecho a asiento en el avión.",
    "No incluye cena o celebración de año nuevo (aplica suplemento bajo solicitud).",
    "Acomodación triple puede ser con cama extra portable tipo Rollaway.",
    "Acomodación matrimonial o twin está sujeta a disponibilidad al momento del check-in.",
    "Los precios indicados en este sitio web, son de carácter informativo y deben ser confirmados para realizar su reservación ya que están sujetos a modificaciones sin previo aviso.",
];

interface CartagenaPageProps {
  onOpenQuote: (details?: QuoteDetails) => void;
}

const CartagenaPage: React.FC<CartagenaPageProps> = ({ onOpenQuote }) => {
    const basePrice = 1199;

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758721849/paquete-cartagena-ano-nuevo-2025-voyana_is8hkh.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Cartagena Mágico</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">La joya del Caribe te espera para un Fin de Año inolvidable.</p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu viaje al Caribe?</h2>
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
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Itinerario de Viaje</h2>
                            <div className="space-y-4">
                                {itinerary.map((item, index) => (
                                    <AccordionItem key={index} title={item.title} content={item.content} />
                                ))}
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-amber-500 pl-4">Excursión Opcional</h2>
                             <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                         <ShipIcon className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-800">Tour a las Islas del Rosario</h3>
                                        <p className="text-amber-700 mt-2">Navega en lancha por la bahía, haz una parada en la fortaleza de San Fernando, practica snorkel en Isla Grande, y relájate en la playa de Isla Cholón y Playa Blanca en Barú. Incluye fruta y bebida de bienvenida. No incluye tasas portuarias.</p>
                                        <p className="mt-4 text-2xl font-bold text-amber-900">USD $122 <span className="text-base font-normal">por persona</span></p>
                                    </div>
                                </div>
                            </div>
                        </section>

                         <section className="mb-12">
                             <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Información de Vuelos</h2>
                             <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6 border">
                                    <h3 className="font-bold text-lg mb-2">Itinerario Aéreo con JetSMART</h3>
                                    <p><span className="font-semibold">JA7780 (29 Dic):</span> Lima – Cartagena (10:00 - 13:36)</p>
                                    <p><span className="font-semibold">JA7781 (02 Ene):</span> Cartagena - Lima (14:29 - 18:10)</p>
                                </div>
                             </div>
                         </section>

                    </div>

                    <aside>
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center shadow-lg">
                                <p className="text-lg text-gray-600">Salida Especial Fin de Año</p>
                                <p className="text-2xl font-bold text-[#0D2B5B] my-2">29 de Diciembre 2025</p>
                                <hr className="my-4"/>
                                <p className="text-sm text-gray-600">Precio preventa por persona</p>
                                <p className="text-5xl font-extrabold text-[#0D2B5B]">US$ {basePrice}</p>
                                <p className="text-xs text-gray-500">En acomodación DBL/TPL</p>
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
                        <p className="text-sm text-gray-600">Precio preventa por persona</p>
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

export default CartagenaPage;
