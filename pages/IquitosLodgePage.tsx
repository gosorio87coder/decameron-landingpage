import React, { useState } from 'react';
import AccordionItem from '../components/AccordionItem';
import DatePicker from '../components/DatePicker';
import { PlaneIcon, HotelIcon, FoodIcon, GuideIcon, LeafIcon, BinocularsIcon } from '../components/icons/FeatureIcons';
import { QuoteDetails } from '../types';

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - Iquitos - Lima' },
    { icon: <GuideIcon />, text: 'Traslados aeropuerto y embarcadero' },
    { icon: <LeafIcon />, text: '03 noches de alojamiento en Lodge con piscina' },
    { icon: <FoodIcon />, text: 'Pensión completa (Desayuno, Almuerzo, Cena)' },
    { icon: <BinocularsIcon />, text: 'Todas las excursiones descritas en el itinerario' },
    { icon: <GuideIcon />, text: 'Guía naturalista bilingüe (español/inglés)' },
];

const itinerary = [
    { title: 'Día 1: Llegada a Iquitos, Mitos y Selva Nocturna', content: 'Recepción en el aeropuerto de Iquitos y traslado al embarcadero. Navegaremos por el río Amazonas hasta el lodge. Tras un refrescante jugo de frutas, te instalarás en tu bungalow. Por la tarde, haremos una caminata para identificar la flora local. Al anochecer, nuestro guía nos contará mitos y leyendas de la selva y saldremos en busca de tarántulas, ranas y otros insectos nocturnos. Cena y noche en el lodge.' },
    { title: 'Día 2: Cultura Yagua, Delfines Rosados y Pirañas', content: 'Después del desayuno, visitaremos a la comunidad nativa de los Yagua para aprender sobre su cultura, danzas y modo de vida. Luego, navegaremos en busca de los majestuosos delfines rosados y grises. Por la tarde, probaremos suerte con la pesca artesanal de pirañas en una cocha. Regresaremos al lodge para disfrutar de la cena y el atardecer amazónico.' },
    { title: 'Día 3: Isla de los Monos y Gigantes Acuáticos', content: 'Hoy visitaremos la "Isla de los Monos", un proyecto de conservación donde podrás interactuar con varias especies de primates en libertad, como el mono araña, el fraile y el pichico. Almuerzo en el lodge. Por la tarde, navegaremos hasta un lugar especial para observar las famosas Victoria Regia, los nenúfares más grandes del mundo. Antes de cenar, haremos una excursión en bote para la búsqueda de caimanes.' },
    { title: 'Día 4: Amanecer en Canoa y Retorno', content: 'Muy temprano, antes del desayuno, daremos un paseo en canoa para recibir el amanecer en el río y escuchar el despertar de la selva, una experiencia verdaderamente mágica. Regresaremos para el desayuno y luego tendrás tiempo libre. A la hora indicada, emprenderemos el viaje de vuelta a Iquitos para tu vuelo de regreso a Lima.' },
];

const addons = [
    { id: 1, name: 'Guía Privado', description: 'Un experto de la selva solo para tu grupo.', price: 150 },
    { id: 2, name: 'Visita a Centro de Rescate', description: 'Conoce y apoya la conservación de manatíes.', price: 45 },
    { id: 3, name: 'Ceremonia con Chamán', description: 'Una experiencia espiritual y ancestral.', price: 120 },
    { id: 4, name: 'Noche Adicional en el Lodge', description: 'Extiende tu aventura en la selva un día más.', price: 180 },
];

interface IquitosLodgePageProps {
  onOpenQuote: (details?: QuoteDetails) => void;
}

const IquitosLodgePage: React.FC<IquitosLodgePageProps> = ({ onOpenQuote }) => {
    const basePrice = 529;
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
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758720502/voyana-iquitos-heliconia-card-3x4-optimized_lxhrk5.webp')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Iquitos Lodge</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">Una inmersión total en la selva, el río y su cultura.</p>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Todo lo que necesitas para tu expedición</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {inclusions.map((item, index) => (
                                    <div key={index} className="flex items-center bg-green-50/50 p-4 rounded-lg">
                                        {React.cloneElement(item.icon, { className: 'h-8 w-8 text-[#1856C5] flex-shrink-0' })}
                                        <span className="ml-4 text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Tu Aventura Día a Día</h2>
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
                                <h3 className="text-xl font-bold mb-4">Personaliza tu Aventura</h3>
                                <div className="space-y-4">
                                    {addons.map(addon => (
                                        <div key={addon.id} className="flex items-center justify-between">
                                            <div>
                                                <label htmlFor={`addon-iq-${addon.id}`} className="font-semibold text-gray-800">{addon.name}</label>
                                                <p className="text-sm text-gray-500">{addon.description}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className="font-bold text-[#0D2B5B]">${addon.price}</span>
                                                <input
                                                  type="checkbox"
                                                  id={`addon-iq-${addon.id}`}
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
                        <p className="text-sm text-gray-600">Precio total por persona</p>
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

export default IquitosLodgePage;
