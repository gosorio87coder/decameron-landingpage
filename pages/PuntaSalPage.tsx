// pages/PuntaSalPage.tsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import AccordionItem from "../components/AccordionItem";
import PassengerInfoModal from "../components/PassengerInfoModal";
import DatePicker from "../components/DatePicker";
import {
  PlaneIcon,
  HotelIcon,
  FoodIcon,
  GuideIcon,
  BriefcaseIcon,
  WhatsAppIcon,
  CalendarIcon,
} from "../components/icons/FeatureIcons";
import { QuoteDetails } from "../types";
import { WHATSAPP_NUMBER } from "../constants";
import { fetchPuntaSalCalendar } from "../services/puntaSalPricing";

// ------------------------------------------------------------
// CONFIG
// ------------------------------------------------------------

const NIGHTS = 3;

// Mes por defecto: MARZO 2026 (month es 0-based, 2 = marzo)
const DEFAULT_MONTH_YEAR = 2026;
const DEFAULT_MONTH_INDEX_ZERO_BASED = 2;

type FareType = "PROMO" | "HIGH" | "SUPER" | "SOLD_OUT";

interface CalendarEntry {
  date: Date;
  price: number;
  isSoldOut: boolean;
  type: FareType;
}

interface MonthGroup {
  label: string;
  items: CalendarEntry[];
}

const galleryImages = [
  "https://res.cloudinary.com/dnszd7czq/image/upload/v1758723079/paquete-todo-incluido-decameron-punta-sal-voyana_i6y8l5.webp",
  "https://res.cloudinary.com/dnszd7czq/image/upload/v1758734015/resort-decameron-voyanaamigos-piscina-cocteles_urhklo.webp",
  "https://res.cloudinary.com/dnszd7czq/image/upload/v1758731259/decameron-punta-sal-frutas-hamburguesa-16x9_nafb56.webp",
  "https://res.cloudinary.com/dnszd7czq/image/upload/v1758732925/habitacion-decameron-punta-sal-voyana_vsldnc.webp",
  "https://res.cloudinary.com/dnszd7czq/image/upload/v1758731258/decameron-punta-sal-carne-postre-16x9_l7ocyp.webp",
];

const inclusions = [
  { icon: <PlaneIcon />, text: "Boleto aéreo Lima - Tumbes - Lima (LATAM)" },
  { icon: <BriefcaseIcon />, text: "Equipaje: Mochila + Carry On por persona" },
  {
    icon: <GuideIcon />,
    text: "Traslados compartidos aeropuerto - hotel - aeropuerto",
  },
  {
    icon: <HotelIcon />,
    text: `${String(NIGHTS).padStart(
      2,
      "0"
    )} noches de alojamiento en Hotel Royal Decameron Punta Sal`,
  },
  {
    icon: <FoodIcon />,
    text: "Sistema todo incluido: desayunos, almuerzos y cenas tipo buffet",
  },
];

const itinerary = [
  {
    title: "Día 1: Bienvenida a Punta Sal",
    content:
      "Recojo en el aeropuerto de Tumbes con un letrero con el nombre del pasajero principal. Traslado directo al hotel Royal Decameron. Día libre para disfrutar de las instalaciones y la playa. Cena buffet y show nocturno.",
  },
  {
    title: "Día 2: Relax y Sol en el Resort",
    content:
      "Desayuno buffet. Disfruta de las instalaciones del hotel que incluyen 5 piscinas, gimnasio y acceso directo a la playa. Almuerzo y snacks durante el día. Por la noche, la cena es en restaurantes de especialidades (previa reserva) y luego puedes unirte al karaoke o shows en vivo.",
  },
  {
    title: "Día 3: Aventura y Diversión",
    content:
      "Desayuno buffet. Día libre para relajarte o tomar una de nuestras excursiones adicionales. Disfruta de las bebidas ilimitadas en los diferentes bares del resort, participa en las actividades de animación o simplemente descansa en la playa. Cena buffet y noche de discoteca.",
  },
  {
    title: "Día 4: Despedida con Sabor",
    content:
      "Desayuno buffet. Mañana libre para un último chapuzón. El check-out de la habitación es a las 12:00 p.m. Podrás disfrutar del almuerzo buffet y las instalaciones hasta las 3:00 p.m., hora programada para el traslado de salida hacia el aeropuerto de Tumbes.",
  },
];

interface PuntaSalPageProps {
  onOpenQuote: (details: QuoteDetails) => void;
  shouldScrollToCalendar?: boolean;
  onScrollComplete?: () => void;
}

// Helper de comparación de fechas (solo día/mes/año)
const isSameDay = (d1?: Date | null, d2?: Date | null): boolean => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const PuntaSalPage: React.FC<PuntaSalPageProps> = ({
  onOpenQuote,
  shouldScrollToCalendar,
  onScrollComplete,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  const [isCustomDateMode, setIsCustomDateMode] = useState(false);

  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const hasInitializedMonthRef = useRef(false);

  const passengerSelectionRef = useRef<HTMLDivElement | null>(null);
  const monthTabsContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToPassengerSelection = () => {
    setTimeout(() => {
      passengerSelectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ------------------------------------------------------------
  // Cargar calendario desde Google Sheets
  // ------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    const loadCalendar = async () => {
      try {
        setIsLoadingCalendar(true);
        const data = await fetchPuntaSalCalendar();
        if (!isMounted) return;
        setCalendarEntries(data);
        setCalendarError(null);
      } catch (err) {
        console.error("Error cargando calendario Punta Sal:", err);
        if (!isMounted) return;
        setCalendarEntries([]);
        setCalendarError(
          "No pudimos cargar las fechas. Intenta de nuevo en unos minutos."
        );
      } finally {
        if (isMounted) setIsLoadingCalendar(false);
      }
    };

    loadCalendar();
    return () => {
      isMounted = false;
    };
  }, []);

  // Scroll automático al calendario cuando vienes desde el header
  useEffect(() => {
    if (shouldScrollToCalendar) {
      const element = document.getElementById("date-selection");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          if (onScrollComplete) onScrollComplete();
        }, 100);
      }
    }
  }, [shouldScrollToCalendar, onScrollComplete]);

  // Siempre al menos 2 adultos si hay fecha seleccionada
  useEffect(() => {
    if (selectedDate && adults < 2) {
      setAdults(2);
    }
  }, [selectedDate, adults]);

  // ------------------------------------------------------------
  // Agrupar fechas por mes
  // ------------------------------------------------------------
  const datesByMonth: MonthGroup[] = useMemo(() => {
    const groups: Record<string, MonthGroup> = {};

    calendarEntries.forEach((item) => {
      const year = item.date.getFullYear();
      const month = item.date.getMonth();
      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!groups[key]) {
        const labelBase = item.date.toLocaleString("es-ES", {
          month: "short",
          year: "numeric",
        });
        const label =
          labelBase.charAt(0).toUpperCase() + labelBase.slice(1);
        groups[key] = { label, items: [] };
      }

      groups[key].items.push(item);
    });

    return Object.keys(groups)
      .sort()
      .map((key) => groups[key]);
  }, [calendarEntries]);

  // Elegir mes por defecto (Marzo 2026) una sola vez
  useEffect(() => {
    if (!datesByMonth.length || hasInitializedMonthRef.current) return;

    const indexForDefault = datesByMonth.findIndex((group) => {
      const sample = group.items[0]?.date;
      if (!sample) return false;
      return (
        sample.getFullYear() === DEFAULT_MONTH_YEAR &&
        sample.getMonth() === DEFAULT_MONTH_INDEX_ZERO_BASED
      );
    });

    setActiveMonthIndex(indexForDefault !== -1 ? indexForDefault : 0);
    hasInitializedMonthRef.current = true;
  }, [datesByMonth]);

  // Ajustar tab activa cuando el usuario elige fecha desde calendario completo
  useEffect(() => {
    if (selectedDate && !isCustomDateMode && datesByMonth.length > 0) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const index = datesByMonth.findIndex((m) => {
        const sample = m.items[0]?.date;
        if (!sample) return false;
        return (
          sample.getFullYear() === year && sample.getMonth() === month
        );
      });
      if (index !== -1 && index !== activeMonthIndex) {
        setActiveMonthIndex(index);
      }
    }
  }, [selectedDate, datesByMonth, isCustomDateMode, activeMonthIndex]);

  // Auto-scroll horizontal para centrar la pestaña del mes activo
  useEffect(() => {
    const container = monthTabsContainerRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLButtonElement>(
      `button[data-month-index="${activeMonthIndex}"]`
    );
    if (!activeButton) return;

    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;
    const containerWidth = container.clientWidth;
    const targetScrollLeft = buttonLeft - (containerWidth - buttonWidth) / 2;

    container.scrollTo({
      left: Math.max(targetScrollLeft, 0),
      behavior: "smooth",
    });
  }, [activeMonthIndex]);

  // ------------------------------------------------------------
  // Derivados
  // ------------------------------------------------------------
  const selectedDateData = useMemo(() => {
    if (!selectedDate) return null;
    return calendarEntries.find((d) => isSameDay(d.date, selectedDate));
  }, [selectedDate, calendarEntries]);

  const isSoldOut = selectedDateData?.isSoldOut ?? false;
  const currentPrice = selectedDateData?.price ?? 0;
  const isSpecialDate = currentPrice > 0;

  const passengerCount = adults + children; // infantes no suman
  const totalPrice = passengerCount * currentPrice;

  const returnDate = useMemo(() => {
    if (!selectedDate) return null;
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + NIGHTS);
    return date;
  }, [selectedDate]);

  // Highlighs para el DatePicker de calendario completo
  const highlightDatesForPicker = useMemo(
    () =>
      calendarEntries.map((d) => ({
        date: d.date,
        price: d.price || null,
        isSoldOut: d.isSoldOut,
      })),
    [calendarEntries]
  );

  // ------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------
  const handlePreBook = () => {
    if (!selectedDate || !isSpecialDate) return;

    const details: QuoteDetails = {
      packageName: "Decameron Punta Sal",
      departureDate: selectedDate,
      adults,
      children,
      infants,
      totalPrice,
      addons: [],
    };

    setQuoteDetails(details);
    setIsPassengerModalOpen(true);
    onOpenQuote(details);
  };

  const handleRequestQuoteViaWhatsapp = () => {
    if (!selectedDate) return;

    const baseDate = selectedDate.toLocaleDateString("es-ES");
    const returnStr = returnDate
      ? ` (retorno ${returnDate.toLocaleDateString("es-ES")})`
      : "";
    const message = `¡Hola Voyana! Quisiera cotizar un viaje a Decameron Punta Sal para el ${baseDate}${returnStr}. Somos ${adults} adultos, ${children} niños y ${infants} infantes. ¡Gracias!`;

    const phoneNumber = WHATSAPP_NUMBER;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCustomDateToggle = (checked: boolean) => {
    setIsCustomDateMode(checked);
    if (!checked && !selectedDateData) {
      // Si volvemos a presets y la fecha no está en la lista, la limpiamos
      setSelectedDate(null);
    }
  };

  const handleCustomDateSelect = (date: Date) => {
    const match = calendarEntries.find((d) => isSameDay(d.date, date));
    setSelectedDate(date);
    if (match) {
      setIsCustomDateMode(false);
    }
    scrollToPassengerSelection();
  };

  const counterButtonClasses =
    "w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-lg font-bold text-[#0D2B5B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

  const renderCtaButton = () => {
    if (isSoldOut) {
      return (
        <button
          disabled
          className="bg-red-500 text-white w-full font-bold py-4 px-10 rounded-lg text-lg mt-4 cursor-not-allowed"
        >
          Fechas agotadas
        </button>
      );
    }

    if (isSpecialDate) {
      return (
        <button
          onClick={handlePreBook}
          className="bg-[#facc15] text-[#0D2B5B] w-full font-bold py-4 px-10 rounded-lg hover:bg-[#eab308] transition-colors duration-300 text-lg mt-4 shadow-md"
        >
          Pre-reservar ahora
        </button>
      );
    }

    if (selectedDate) {
      return (
        <button
          onClick={handleRequestQuoteViaWhatsapp}
          className="bg-green-500 text-white w-full font-bold py-4 px-10 rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg mt-4 flex items-center justify-center gap-2 shadow-md"
        >
          <WhatsAppIcon className="h-6 w-6" />
          Cotiza con agente
        </button>
      );
    }

    return null;
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758723079/paquete-todo-incluido-decameron-punta-sal-voyana_i6y8l5.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">
            Decameron Punta Sal
          </h1>
          <p className="text-xl md:text-2xl mt-2 font-light">
            La experiencia todo incluido que mereces.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => scrollToSection("what-is-included")}
              className="bg-[#facc15] text-[#0D2B5B] font-bold py-3 px-8 rounded-lg hover:bg-[#eab308] transition-colors text-lg shadow-lg"
            >
              Qué incluye
            </button>
            <button
              onClick={() => scrollToSection("date-selection")}
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors text-lg shadow-lg uppercase"
            >
              COTIZA
            </button>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Galería de Destinos
          </h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Punta Sal view ${index + 1}`}
                className="w-80 h-60 object-cover rounded-lg shadow-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* IZQUIERDA */}
          <div className="lg:col-span-2">
            <section id="what-is-included" className="mb-12 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">
                ¿Qué incluye tu paquete?
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {inclusions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-50/50 p-4 rounded-lg"
                  >
                    {React.cloneElement(item.icon, {
                      className: "h-8 w-8 text-[#1856C5] flex-shrink-0",
                    })}
                    <span className="ml-4 text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">
                Itinerario Día a Día
              </h2>
              <div className="space-y-4">
                {itinerary.map((item, index) => (
                  <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* DERECHA: CALENDARIO + PASAJEROS */}
          <aside>
            <div
              id="date-selection"
              className="scroll-mt-32 sticky top-28 space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg"
            >
              <h3 className="text-xl font-bold text-[#0D2B5B]">
                Elige tu fecha de salida
              </h3>

              {isLoadingCalendar && (
                <p className="text-sm text-gray-500 mb-2">
                  Cargando fechas disponibles...
                </p>
              )}

              {calendarError && (
                <p className="text-sm text-red-500 mb-2">
                  {calendarError}
                </p>
              )}

              {/* MODO LISTA DE FECHAS POR MES */}
              {!isCustomDateMode ? (
                <div>
                  {/* Tabs de meses */}
                  <div
                    ref={monthTabsContainerRef}
                    className="grid grid-cols-2 gap-2 mb-4 sm:flex sm:space-x-2 sm:overflow-x-auto sm:pb-2 sm:no-scrollbar"
                  >
                    {datesByMonth.map((group, index) => (
                      <button
                        key={group.label}
                        data-month-index={index}
                        onClick={() => setActiveMonthIndex(index)}
                        className={`w-full sm:w-auto whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                          activeMonthIndex === index
                            ? "bg-[#1856C5] text-white shadow-md"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {group.label}
                      </button>
                    ))}
                  </div>

                  {/* Grid de fechas */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 max-h-[24rem] overflow-y-auto pr-1 pb-2 pt-8">
                    {datesByMonth[activeMonthIndex]?.items.map(
                      ({ date, price, isSoldOut, type }) => {
                        const isSelected = isSameDay(date, selectedDate);
                        const isPromo = type === "PROMO";

                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => {
                              if (!isSoldOut) {
                                setSelectedDate(date);
                                scrollToPassengerSelection();
                              }
                            }}
                            disabled={isSoldOut}
                            className={`
                              relative flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all duration-200 h-24
                              ${
                                isSoldOut
                                  ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-[#1856C5] border-[#1856C5] text-white shadow-lg scale-105 z-10"
                                  : isPromo
                                  ? "bg-amber-50 border-amber-400 hover:border-amber-500 hover:shadow-md"
                                  : "bg-white border-gray-200 hover:border-[#1856C5] hover:shadow-md"
                              }
                            `}
                          >
                            {/* Badge solo para PROMO (OFERTA) */}
                            {!isSoldOut && isPromo && (
                              <span
                                className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm tracking-wider border border-white/20 z-20 whitespace-nowrap bg-[#facc15] text-[#0D2B5B]"
                              >
                                OFERTA
                              </span>
                            )}

                            <span
                              className={`text-xs uppercase font-medium mb-1 ${
                                isSelected ? "text-blue-200" : "text-gray-500"
                              }`}
                            >
                              {date
                                .toLocaleDateString("es-ES", {
                                  weekday: "short",
                                })
                                .replace(".", "")}
                            </span>
                            <span
                              className={`text-2xl font-extrabold leading-none ${
                                isSelected ? "text-white" : "text-gray-800"
                              }`}
                            >
                              {date.getDate()}
                            </span>
                            {isSoldOut ? (
                              <span className="text-[10px] font-bold text-red-400 uppercase mt-1">
                                Agotado
                              </span>
                            ) : (
                              <span
                                className={`text-sm font-bold mt-1 ${
                                  isSelected
                                    ? "text-yellow-300"
                                    : "text-[#1856C5]"
                                }`}
                              >
                                US$ {price}
                              </span>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {datesByMonth.length === 0 && !isLoadingCalendar && !calendarError && (
                    <p className="text-gray-500 text-center py-8">
                      No hay fechas disponibles en este momento.
                    </p>
                  )}
                </div>
              ) : (
                // MODO CALENDARIO COMPLETO
                <div className="mt-2">
                  <DatePicker
                    selectedDate={selectedDate}
                    onDateSelect={handleCustomDateSelect}
                    minDaysFromToday={15}
                    highlightDates={highlightDatesForPicker}
                  />
                </div>
              )}

              {/* Toggle calendario completo */}
              <div className="flex items-center gap-2 pt-4 border-t mt-4">
                <input
                  type="checkbox"
                  id="custom-date-mode"
                  checked={isCustomDateMode}
                  onChange={(e) => handleCustomDateToggle(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label
                  htmlFor="custom-date-mode"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Quiero ver otras fechas (calendario completo)
                </label>
              </div>

              {/* PASAJEROS + RESUMEN + CTA */}
              {selectedDate && (
                <div
                  ref={passengerSelectionRef}
                  className="animate-fade-in space-y-6 pt-6 border-t"
                >
                  {/* Adultos / Niños / Infantes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <label
                        htmlFor="adults-count"
                        className="mb-2 text-sm font-bold text-gray-600"
                      >
                        Adultos
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setAdults((a) => Math.max(2, a - 1))
                          }
                          disabled={adults <= 2}
                          className={counterButtonClasses}
                        >
                          -
                        </button>
                        <span
                          id="adults-count"
                          className="w-6 text-center font-bold text-xl"
                        >
                          {adults}
                        </span>
                        <button
                          onClick={() => setAdults((a) => a + 1)}
                          className={counterButtonClasses}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <label
                        htmlFor="children-count"
                        className="mb-2 text-sm font-bold text-gray-600"
                      >
                        Niños (2-11)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setChildren((c) => Math.max(0, c - 1))
                          }
                          disabled={children <= 0}
                          className={counterButtonClasses}
                        >
                          -
                        </button>
                        <span
                          id="children-count"
                          className="w-6 text-center font-bold text-xl"
                        >
                          {children}
                        </span>
                        <button
                          onClick={() => setChildren((c) => c + 1)}
                          className={counterButtonClasses}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <label
                        htmlFor="infants-count"
                        className="mb-2 text-sm font-bold text-gray-600 text-center"
                      >
                        Infantes (0-1)
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setInfants((i) => Math.max(0, i - 1))
                          }
                          disabled={infants <= 0}
                          className={counterButtonClasses}
                        >
                          -
                        </button>
                        <span
                          id="infants-count"
                          className="w-6 text-center font-bold text-xl"
                        >
                          {infants}
                        </span>
                        <button
                          onClick={() => setInfants((i) => i + 1)}
                          className={counterButtonClasses}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Resumen y precio solo si es fecha especial */}
                  {isSpecialDate && (
                    <>
                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-bold mb-3 text-[#0D2B5B]">
                          Resumen del viaje
                        </h3>
                        <div className="space-y-2 text-sm text-gray-700 bg-gray-100/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-[#1856C5] flex-shrink-0" />
                            <span className="font-medium">
                              Salida:{" "}
                              {selectedDate.toLocaleDateString("es-ES")}
                              {returnDate &&
                                ` · Retorno: ${returnDate.toLocaleDateString(
                                  "es-ES"
                                )}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <HotelIcon className="h-4 w-4 text-[#1856C5] flex-shrink-0" />
                            <span>
                              Royal Decameron Punta Sal · {NIGHTS} noches ·
                              Todo incluido
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PlaneIcon className="h-4 w-4 text-[#1856C5] flex-shrink-0" />
                            <span>
                              Vuelos Lima - Tumbes - Lima (LATAM)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="h-4 w-4 text-[#1856C5] flex-shrink-0" />
                            <span>Incluye Mochila + Carry On</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                          Precio total estimado
                        </p>
                        <p className="text-4xl font-extrabold text-[#0D2B5B] tracking-tight">
                          US$ {totalPrice.toLocaleString("en-US")}
                        </p>
                      </div>
                    </>
                  )}

                  {!isSpecialDate && (
                    <div className="text-center text-sm text-gray-600 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      Un asesor te contactará con una cotización
                      personalizada para la fecha seleccionada.
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





