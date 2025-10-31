import React from 'react';
import { GlobeAltIcon, StarIcon, ChatBubbleLeftRightIcon } from './icons/FeatureIcons';

const reasons = [
    {
        icon: <StarIcon />,
        title: 'Experiencias Únicas',
        description: 'Diseñamos viajes que van más allá de lo convencional, creando recuerdos que durarán toda la vida.'
    },
    {
        icon: <GlobeAltIcon />,
        title: 'Expertos en Destinos',
        description: 'Nuestro equipo ha recorrido el mundo para ofrecerte los mejores consejos y secretos de cada lugar.'
    },
    {
        icon: <ChatBubbleLeftRightIcon />,
        title: 'Asistencia 24/7',
        description: 'Estamos contigo antes, durante y después de tu viaje para resolver cualquier imprevisto.'
    }
];

const WhyChooseUs: React.FC = () => {
    return (
        <section id="why-us" className="py-16 sm:py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0D2B5B]">¿Por qué elegir Voyana?</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Tu viaje soñado, en las mejores manos.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reasons.map((reason, index) => (
                        <div key={index} className="text-center">
                            <div className="text-[#1856C5] mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                                {React.cloneElement(reason.icon, { className: 'w-10 h-10' })}
                            </div>
                            <h3 className="text-2xl font-bold text-[#0D2B5B] mb-3">{reason.title}</h3>
                            <p className="text-gray-600">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;