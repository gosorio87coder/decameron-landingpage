import React, { useState } from 'react';
import { PackageCategory } from '../types';
import { NATIONAL_PACKAGES, INTERNATIONAL_PACKAGES } from '../constants';
import TravelPackageCard from './TravelPackageCard';

interface BestsellersProps {
  onPackageSelect: (id: number) => void;
}

const Bestsellers: React.FC<BestsellersProps> = ({ onPackageSelect }) => {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>(PackageCategory.National);

  const packages = activeCategory === PackageCategory.National ? NATIONAL_PACKAGES : INTERNATIONAL_PACKAGES;

  const CategoryButton: React.FC<{ category: PackageCategory; label: string; }> = ({ category, label }) => (
    <button
      onClick={() => setActiveCategory(category)}
      className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
        activeCategory === category
          ? 'bg-[#1856C5] text-white shadow-lg'
          : 'bg-white text-[#0D2B5B] hover:bg-gray-200 border border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="packages" className="py-16 sm:py-24">
      <div className="mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0D2B5B] mb-4">Paquetes Más Vendidos</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Explora nuestros destinos estrella y prepárate para tu próxima aventura inolvidable.</p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <CategoryButton category={PackageCategory.National} label="Destinos Nacionales" />
          <CategoryButton category={PackageCategory.International} label="Destinos Internacionales" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <TravelPackageCard key={pkg.id} pkg={pkg} onSelect={onPackageSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
