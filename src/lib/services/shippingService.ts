export interface ShippingRateCalculation {
  shippingFee: number;
  isFreeShipping: boolean;
  freeThreshold: number;
  amountNeededForFreeShipping: number;
  estimatedDays: string;
  courierPartner: string;
}

export const shippingService = {
  calculateShipping(subtotal: number, city?: string): ShippingRateCalculation {
    const freeThreshold = 5000;
    const isFreeShipping = subtotal >= freeThreshold || subtotal === 0;
    const shippingFee = isFreeShipping ? 0 : 300;
    const amountNeededForFreeShipping = Math.max(0, freeThreshold - subtotal);

    // City-based estimated delivery timeframe
    const majorHubs = ['islamabad', 'rawalpindi', 'peshawar', 'lahore', 'karachi', 'quetta', 'multan'];
    const cleanCity = (city || '').toLowerCase().trim();

    let estimatedDays = '2–3 Business Days';
    if (cleanCity && !majorHubs.includes(cleanCity)) {
      estimatedDays = '3–5 Business Days';
    }

    return {
      shippingFee,
      isFreeShipping,
      freeThreshold,
      amountNeededForFreeShipping,
      estimatedDays,
      courierPartner: 'TCS Express / Leopards COD',
    };
  },
};
