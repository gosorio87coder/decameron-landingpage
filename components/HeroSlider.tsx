import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  image: string;
  theme: string;
  subtitle: string;
  destination: string;
  duration: string;
  price: string;
  details: string;
  cta: string;
  gradient: string;
  packageId?: number;
}

const slides: Slide[] = [
  {
    image: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758721222/paquete-fin-de-ano-varadero-habana-cuba_dzfmhp.webp',
    theme: 'Recibe el 2026 con Sabor',
    subtitle: 'Ritmo, Playa y Tradición',
    destination: 'Varadero & Habana',
    duration: 'Salida: 29 Diciembre',
    price: '1,299',
    details: 'por persona',
    cta: 'Ver Detalles',
    gradient: 'from-cyan-900/80 via-amber-600/30 to-transparent',
    packageId: 7,
  },
  {
    image: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758721849/paquete-cartagena-ano-nuevo-2025-voyana_is8hkh.webp',
    theme: 'Año Nuevo Mágico',
    subtitle: 'La Joya del Caribe',
    destination: 'Cartagena',
    duration: 'Salida: 29 Diciembre',
    price: '1,199',
    details: 'por persona',
    cta: 'Ver Detalles',
    gradient: 'from-sky-900/80 via-yellow-400/30 to-transparent',
    packageId: 8,
  },
  {
    image: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758721223/paquete-viaje-europa-inolvidable-ano-nuevo-2025_1_zbs4dk.webp',
    theme: 'Un Fin de Año Inolvidable',
    subtitle: 'Madrid • Barcelona • Niza • Roma • Florencia • Venecia • Zurich • París • Burdeos',
    destination: 'Europa',
    duration: 'Salida: 18 Diciembre',
    price: '3,299',
    details: 'por persona',
    cta: 'Explora el Circuito',
    gradient: 'from-slate-900/80 via-indigo-700/40 to-transparent',
    packageId: 9,
  },
];

interface HeroSliderProps {
  onPackageSelect: (id: number) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onPackageSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const currentSlide = slides[currentIndex];

  const handleSlideClick = () => {
    if (currentSlide.packageId) {
      onPackageSelect(currentSlide.packageId);
    }
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const destinationFontSize = (() => {
    const destination = currentSlide.destination;
    if (destination === 'Varadero & Habana') {
      return 'text-5xl md:text-7xl lg:text-8xl';
    }
    if (destination === 'Cartagena') {
      // Use smaller font on mobile to prevent text wrapping/overflow
      return 'text-5xl md:text-8xl lg:text-9xl';
    }
    // Default for 'Europa'
    return 'text-6xl md:text-8xl lg:text-9xl';
  })();

  const subtitleClasses = (() => {
    if (currentSlide.destination === 'Europa') {
      // Adjusted font size for mobile to fit the long list of cities in two lines.
      return 'text-sm sm:text-base md:text-xl';
    }
    // Default size for other slides.
    return 'text-lg md:text-xl';
  })();


  return (
    <section
      className={`h-[60vh] md:h-[80vh] w-full m-auto relative group ${currentSlide.packageId ? 'cursor-pointer' : ''}`}
      onClick={handleSlideClick}
      role={currentSlide.packageId ? 'button' : 'region'}
      aria-label={currentSlide.packageId ? `Ver detalles del paquete ${currentSlide.destination}` : 'Carrusel de ofertas'}
      tabIndex={currentSlide.packageId ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSlideClick();
        }
      }}
    >
      <div
        style={{ backgroundImage: `url(${currentSlide.image})` }}
        className="w-full h-full bg-center bg-cover duration-1000 ease-in-out"
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} opacity-80`}></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center p-4 w-full flex flex-col items-center">
        <h2 className="font-great-vibes text-4xl sm:text-5xl md:text-7xl text-yellow-300 mb-2 drop-shadow-lg">{currentSlide.theme}</h2>
        <p className={`font-poppins ${subtitleClasses} font-medium text-white/95 mb-4 max-w-4xl`}>{currentSlide.subtitle}</p>
        <h1 className={`font-montserrat font-extrabold ${destinationFontSize} text-white uppercase tracking-wider drop-shadow-xl`}>{currentSlide.destination}</h1>
        
        <div className="bg-black/30 backdrop-blur-sm inline-block px-4 py-1 rounded-full text-sm md:text-base font-semibold border border-white/30 my-6">
          {currentSlide.duration}
        </div>
        
        <div className="my-4">
            <p className="font-poppins text-lg md:text-xl">Desde</p>
            <p className="font-montserrat font-extrabold text-5xl sm:text-6xl md:text-8xl drop-shadow-lg">US$ {currentSlide.price}</p>
            <p className="font-poppins text-xs md:text-sm uppercase tracking-widest text-white/80">{currentSlide.details}</p>
        </div>

        <button
          onClick={(e) => {
            stopPropagation(e);
            if(currentSlide.packageId) {
                handleSlideClick();
            } else {
                // Fallback for buttons without a direct page link
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-[#facc15] text-[#0D2B5B] inline-block px-8 py-3 rounded-lg text-base md:text-lg font-bold shadow-lg hover:bg-[#eab308] transition-colors"
        >
          {currentSlide.cta}
        </button>
      </div>

      {/* Left Arrow */}
      <button aria-label="Previous slide" onClick={(e) => { stopPropagation(e); prevSlide(); }} className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      {/* Right Arrow */}
      <button aria-label="Next slide" onClick={(e) => { stopPropagation(e); nextSlide(); }} className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center py-2 space-x-3">
        {slides.map((slide, slideIndex) => (
          <button
            aria-label={`Go to slide ${slideIndex + 1}`}
            key={slideIndex}
            onClick={(e) => { stopPropagation(e); goToSlide(slideIndex); }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;