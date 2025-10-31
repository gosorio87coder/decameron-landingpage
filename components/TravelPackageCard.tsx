import React from 'react';
import { TravelPackage } from '../types';

interface TravelPackageCardProps {
  pkg: TravelPackage;
  onSelect: (id: number) => void;
}

const CardContent: React.FC<{ pkg: TravelPackage }> = ({ pkg }) => {
  // Apply a more transparent gradient specifically for the Iquitos card (id: 2)
  const gradientClass = pkg.id === 2
    ? 'from-black/30 via-black/10 to-transparent'
    : 'from-black/60 via-black/25 to-transparent';

  const tagBgClass = pkg.id === 2 ? 'bg-orange-500' : 'bg-red-600';

  return (
    <>
      {/* Background Image */}
      <img 
        src={pkg.imageUrl} 
        alt={pkg.title} 
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110" 
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass}`}></div>

      {/* Content */}
      <div className="relative p-6 flex flex-col h-full justify-start text-left text-white">
        <div>
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span className="bg-[#facc15] text-[#0D2B5B] text-xs font-bold px-3 py-1 rounded-full">
              {pkg.duration}
            </span>
            {pkg.tag && (
              <span className={`${tagBgClass} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                {pkg.tag}
              </span>
            )}
          </div>
          <h3 className="font-montserrat text-3xl font-extrabold uppercase leading-tight mb-2 tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {pkg.id === 1 ? <>Decameron<br />Punta Sal</> : pkg.title}
          </h3>
          {pkg.locations && pkg.locations.length > 0 && (
            <p className="text-sm text-white/90 mb-4">
              {pkg.locations.join(' • ')}
            </p>
          )}
           <p className="text-base font-semibold">desde <span className="text-xl font-bold">${pkg.priceFrom}</span></p>
        </div>
      </div>
    </>
  );
};

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({ pkg, onSelect }) => {
  const commonClasses = "relative rounded-2xl shadow-lg overflow-hidden group aspect-[3/4] text-white transform hover:-translate-y-2 transition-transform duration-300";

  return (
    <button onClick={() => onSelect(pkg.id)} className={`${commonClasses} w-full text-left`}>
      <CardContent pkg={pkg} />
    </button>
  );
};

export default TravelPackageCard;
