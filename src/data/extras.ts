import { ExtraService } from '../types';

export const EXTRA_SERVICES_DATA: ExtraService[] = [
  {
    id: 'extra-breakfast',
    nameKey: 'extraBreakfastTitle',
    descriptionKey: 'extraBreakfastDesc',
    priceBgn: 18,
    priceEur: 9,
    perPerson: true,
    perNight: true,
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'extra-dinner',
    nameKey: 'extraDinnerTitle',
    descriptionKey: 'extraDinnerDesc',
    priceBgn: 38,
    priceEur: 20,
    perPerson: true,
    iconName: 'Wine',
  },
  {
    id: 'extra-bbq',
    nameKey: 'extraBbqTitle',
    descriptionKey: 'extraBbqDesc',
    priceBgn: 65,
    priceEur: 33,
    iconName: 'Flame',
  },
  {
    id: 'extra-bikes',
    nameKey: 'extraBikesTitle',
    descriptionKey: 'extraBikesDesc',
    priceBgn: 25,
    priceEur: 13,
    perPerson: true,
    iconName: 'Bike',
  },
  {
    id: 'extra-transfer',
    nameKey: 'extraTransferTitle',
    descriptionKey: 'extraTransferDesc',
    priceBgn: 20,
    priceEur: 10,
    iconName: 'Car',
  }
];
