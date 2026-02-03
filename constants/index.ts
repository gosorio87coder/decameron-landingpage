import { TravelPackage } from '../types';

export const WHATSAPP_NUMBER = '51969354352';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const NATIONAL_PACKAGES: TravelPackage[] = [
  {
    id: 1,
    title: 'Decameron Punta Sal',
    duration: '4D/3N',
    imageUrl: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758718872/voyana-punta-sal-decameron-card-3x4_zsx775.webp',
    priceFrom: 599,
    locations: [],
    tag: 'Todo Incluido',
  },
  {
    id: 2,
    title: 'Iquitos Lodge',
    duration: '4D/3N',
    imageUrl: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758720502/voyana-iquitos-heliconia-card-3x4-optimized_lxhrk5.webp',
    priceFrom: 529,
    locations: ['Río Amazonas', 'Selva', 'Comunidades Nativas'],
    tag: 'Pensión Completa',
  },
  {
    id: 3,
    title: 'Cusco Mágico',
    duration: '4D/3N',
    imageUrl: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758720006/voyana-cusco-machu-picchu-card-3x4-v3_rxrcoo.webp',
    priceFrom: 399,
    locations: ['Cusco', 'Valle Sagrado', 'Machu Picchu'],
    tag: 'Imperdible'
  },
];

export const INTERNATIONAL_PACKAGES: TravelPackage[] = [
  {
    id: 7,
    title: 'Varadero & Habana',
    duration: '6D/5N',
    imageUrl: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758721222/paquete-fin-de-ano-varadero-habana-cuba_dzfmhp.webp',
    priceFrom: 1299,
    locations: ['Varadero', 'La Habana', 'Cuba'],
    tag: 'Fin de Año 2025',
  },
  {
    id: 8,
    title: 'Cartagena',
    duration: '5D/4N',
    imageUrl: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758721849/paquete-cartagena-ano-nuevo-2025-voyana_is8hkh.webp',
    priceFrom: 1199,
    locations: ['Ciudad Amurallada', 'Islas del Rosario', 'Barú'],
    tag: 'Fin de Año 2025',
  },
  {
    id: 9,
    title: 'Europa Inolvidable',
    duration: '17D/16N',
    imageUrl: 'https://res.cloudinary.com/dnszd7czq/image/upload/v1758721223/paquete-viaje-europa-inolvidable-ano-nuevo-2025_1_zbs4dk.webp',
    priceFrom: 3299,
    locations: ['Madrid', 'París', 'Roma', 'y más...'],
    tag: 'Fin de Año 2025',
  },
];