import React from 'react';
import AccordionItem from '../components/AccordionItem';
import { PlaneIcon, HotelIcon, FoodIcon, GuideIcon, CocktailIcon, DolphinIcon, ShipIcon } from '../components/icons/FeatureIcons';
import { QuoteDetails } from '../types';

const galleryImages = [
    'https://images.unsplash.com/photo-1592534157125-086a693245a4?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579543324623-6490333280c7?q=80&w=2012&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616229312217-9594f8f3c713?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563375373-2075ab4a4066?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598909825492-7574a123f11d?q=80&w=1974&auto=format&fit=crop',
];

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - La Habana - Lima' },
    { icon: <GuideIcon />, text: 'Traslados en bus climatizado' },
    { icon: <HotelIcon />, text: '03 Noches en Varadero / 02 Noches en La Habana' },
    { icon: <FoodIcon />, text: 'Sistema Todo Incluido en Varadero' },
    { icon: <CocktailIcon />, text: 'Coctel de Bienvenida en hoteles' },
    { icon: <GuideIcon />, text: 'City Tour en La Habana con guía' },
];

const itinerary = [
    { title: 'Día 1: Lima – La Habana - Varadero', content: 'Llegada a Cuba por Aeropuerto de La Habana. Recibimiento por representantes de la Agencia. Traslado al Hotel seleccionado en Varadero. Coctel de Bienvenida y Alojamiento en Plan Todo Incluido.' },
    { title: 'Día 2: Día Libre en Varadero', content: 'Día libre para disfrutar de la playa y de los servicios Todo Incluido del Hotel de Varadero. Opcional de excursión disponible.' },
    { title: 'Día 3: Varadero – Día Libre', content: 'Día a disposición para disfrute de todos los servicios de Todo Incluido del Hotel y de la playa de Varadero.' },
    { title: 'Día 4: Varadero – La Habana', content: 'Desayuno Buffet. Salida en Bus Climatizado y Guía hacia La Habana. Parada en el puente de Bacunayagua para admirar el Valle de Viñales. Llegada al Hotel seleccionado en La Habana. Coctel de Bienvenida y Alojamiento.' },
    { title: 'Día 5: City Tour en La Habana', content: 'Desayuno Buffet. Salida en Bus climatizado y guía para realizar la Excursión City Tour Habana para apreciar los encantos de una ciudad de más de 500 años. Se visita la parte antigua, plazas emblemáticas, el malecón y el Paseo del Prado. Regreso al Hotel.' },
    { title: 'Día 6: La Habana – Lima', content: 'Desayuno Buffet. Salida en BUS Climatizado hacia el Aeropuerto de La Habana para tomar vuelo de regreso con destino a la ciudad de origen. Fin de los servicios.' },
];

const importantNotes = [
    "Tarifa de preventa vigente hasta el 30 de Julio.",
    "Infantes (0-1 año) pagan 10% de la tarifa adulto.",
    "Acomodación triple consta de 2 camas dobles o sofá cama según disponibilidad.",
    "No se sugiere habitación triple para 3 adultos.",
];

interface VaraderoHabanaPageProps {
  onOpenQuote: (details?: QuoteDetails) => void;
}

const VaraderoHabanaPage: React.FC<VaraderoHabanaPageProps> = ({ onOpenQuote }) => {
    const basePrice = 1299;

    return (
        <div className="animate-fade-in">
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758721222/paquete-fin-de-ano-varadero-habana-cuba_dzfmhp.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Varadero & Habana</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">Ritmo, playa y tradición para recibir el Año Nuevo.</p>
                </div>
            </section>
            
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">Galería de Cuba</h2>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {galleryImages.map((src, index) => (
                            <img key={index} src={src} alt={`Cuba view ${index + 1}`} className="w-80 h-60 object-cover rounded-lg shadow-md flex-shrink-0" />
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu viaje a Cuba?</h2>
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
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-amber-500 pl-4">Excursión Opcional en Varadero</h2>
                             <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 flex space-x-2">
                                         <DolphinIcon className="h-8 w-8 text-amber-600" />
                                         <ShipIcon className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-800">Catamarán a Cayo Blanco + Nado con Delfines</h3>
                                        <p className="text-amber-700 mt-2">Recogida en el Hotel, snorkel en arrecife de coral, tiempo libre en Cayo Blanco con almuerzo buffet de mariscos y bebidas ilimitadas a bordo. Finaliza con 15 minutos de interacción con delfines.</p>
                                        <p className="mt-4 text-2xl font-bold text-amber-900">USD $127 <span className="text-base font-normal">por persona</span></p>
                                    </div>
                                </div>
                            </div>
                        </section>

                         <section className="mb-12">
                             <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Información de Vuelos y Hoteles</h2>
                             <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6 border">
                                    <h3 className="font-bold text-lg mb-2">Itinerario Aéreo con LATAM</h3>
                                    <p><span className="font-semibold">LA2410:</span> Lima – La Habana (08:15 - 13:55)</p>
                                    <p><span className="font-semibold">LA2411:</span> La Habana - Lima (15:05 - 20:20)</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 border">
                                    <h3 className="font-bold text-lg mb-2">Hoteles Previstos o Simulares</h3>
                                    <p><span className="font-semibold">Categoría 4*:</span> Roc Presidente (Habana) y Roc Arenas Doradas (Varadero)</p>
                                    <p><span className="font-semibold">Categoría 4* Sup:</span> Melia Cohiba (Habana) y Melia Península (Varadero)</p>
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
                                    {importantNotes.map((note, index) => <li key={index}>{note}</li>)}
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

export default VaraderoHabanaPage;
