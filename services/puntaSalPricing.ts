// services/puntaSalPricing.ts
export type FareType = "PROMO" | "HIGH" | "SUPER" | "SOLD_OUT";

export interface CalendarEntry {
  date: Date;
  price: number;
  isSoldOut: boolean;
  type: FareType;
}

// URL por defecto de tu Google Sheet (la que me pasaste)
const DEFAULT_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2_bNfqTOinVAxcOS-P8BvaToS-PH9MngOLIswsxhmyqXDMQmgepoU13lKHIO28EOVL7u4IojD8NqV/pub?gid=0&single=true&output=csv";

// Si existe la env, la usamos; si no, usamos la default
const SHEET_CSV_URL =
  import.meta.env.VITE_PUNTA_SAL_CSV_URL || DEFAULT_SHEET_CSV_URL;

export async function fetchPuntaSalCalendar(): Promise<CalendarEntry[]> {
  if (!SHEET_CSV_URL) {
    console.error("No hay URL de Sheet configurada");
    return [];
  }

  console.log("Usando URL de Punta Sal:", SHEET_CSV_URL);

  const res = await fetch(SHEET_CSV_URL);

  console.log("Respuesta CSV Punta Sal:", res.status, res.statusText);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Error al leer CSV de Punta Sal:", body);
    throw new Error("No se pudo leer el Sheet de Punta Sal");
  }

  const text = await res.text();
  const lines = text.trim().split("\n");

  // Quitamos cabecera: date,fare_type,price_usd
  const dataLines = lines.slice(1);

  const entries: CalendarEntry[] = [];

  for (const line of dataLines) {
    if (!line.trim()) continue;

    const [rawDate, rawFareType, rawPrice] = line.split(",");

    if (!rawDate) continue;

    const date = new Date(`${rawDate.trim()}T12:00:00`);

    const fareRaw = (rawFareType || "").trim().toUpperCase();
    let type: FareType;

    switch (fareRaw) {
      case "PROMO":
        type = "PROMO";
        break;
      case "SUPER":
        type = "SUPER";
        break;
      case "SOLD OUT":
        type = "SOLD_OUT";
        break;
      case "HIGH":
      default:
        type = "HIGH";
        break;
    }

    const isSoldOut = type === "SOLD_OUT";

    const numericPrice = isSoldOut
      ? 0
      : Number((rawPrice || "").replace(/[^0-9.]/g, "")) || 0;

    entries.push({
      date,
      price: numericPrice,
      isSoldOut,
      type,
    });
  }

  entries.sort((a, b) => a.date.getTime() - b.date.getTime());

  console.log("Fechas Punta Sal cargadas:", entries.length);
  return entries;
}



