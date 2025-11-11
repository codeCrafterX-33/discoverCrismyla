/**
 * Canadian Tax Calculation by Province/Territory
 * 
 * Tax rates are determined by the shipping destination province/territory.
 * Rates are accurate as of 2024.
 * 
 * HST (Harmonized Sales Tax) provinces combine GST + PST into one rate.
 * Other provinces charge GST (5% federal) + PST separately.
 */

export type CanadianProvince =
  | "AB" // Alberta
  | "BC" // British Columbia
  | "MB" // Manitoba
  | "NB" // New Brunswick
  | "NL" // Newfoundland and Labrador
  | "NS" // Nova Scotia
  | "NT" // Northwest Territories
  | "NU" // Nunavut
  | "ON" // Ontario
  | "PE" // Prince Edward Island
  | "QC" // Quebec
  | "SK" // Saskatchewan
  | "YT"; // Yukon

/**
 * Tax rates by province/territory (as percentage)
 * HST provinces: combined GST + PST rate
 * Other provinces: total effective rate (GST + PST)
 */
const PROVINCE_TAX_RATES: Record<CanadianProvince, number> = {
  AB: 0.05, // Alberta: 5% GST only
  BC: 0.12, // British Columbia: 5% GST + 7% PST = 12%
  MB: 0.12, // Manitoba: 5% GST + 7% PST = 12%
  NB: 0.15, // New Brunswick: 15% HST
  NL: 0.15, // Newfoundland and Labrador: 15% HST
  NS: 0.15, // Nova Scotia: 15% HST
  NT: 0.05, // Northwest Territories: 5% GST only
  NU: 0.05, // Nunavut: 5% GST only
  ON: 0.13, // Ontario: 13% HST
  PE: 0.15, // Prince Edward Island: 15% HST
  QC: 0.14975, // Quebec: 5% GST + 9.975% QST = 14.975% (rounded to 15% in practice)
  SK: 0.11, // Saskatchewan: 5% GST + 6% PST = 11%
  YT: 0.05, // Yukon: 5% GST only
};

/**
 * Province names for display
 */
export const PROVINCE_NAMES: Record<CanadianProvince, string> = {
  AB: "Alberta",
  BC: "British Columbia",
  MB: "Manitoba",
  NB: "New Brunswick",
  NL: "Newfoundland and Labrador",
  NS: "Nova Scotia",
  NT: "Northwest Territories",
  NU: "Nunavut",
  ON: "Ontario",
  PE: "Prince Edward Island",
  QC: "Quebec",
  SK: "Saskatchewan",
  YT: "Yukon",
};

/**
 * Get tax rate for a specific province
 */
export function getTaxRate(province?: CanadianProvince | string | null): number {
  if (!province) {
    // Default to Ontario if no province specified
    return PROVINCE_TAX_RATES.ON;
  }
  const upperProvince = province.toUpperCase() as CanadianProvince;
  return PROVINCE_TAX_RATES[upperProvince] ?? PROVINCE_TAX_RATES.ON;
}

/**
 * GST rate (5% federal tax - applies to all provinces)
 */
const GST_RATE = 0.05;

/**
 * PST rates by province (provincial sales tax)
 */
const PST_RATES: Partial<Record<CanadianProvince, number>> = {
  BC: 0.07, // British Columbia: 7% PST
  MB: 0.07, // Manitoba: 7% PST
  SK: 0.06, // Saskatchewan: 6% PST
};

/**
 * QST rate for Quebec (9.975%)
 */
const QST_RATE = 0.09975;

/**
 * Calculate GST amount (5% federal tax)
 */
export function calculateGST(subtotal: number): number {
  return Math.round(subtotal * GST_RATE);
}

/**
 * Calculate PST amount based on province
 */
export function calculatePST(
  subtotal: number,
  province?: CanadianProvince | string | null
): number {
  if (!province) return 0;
  const upperProvince = province.toUpperCase() as CanadianProvince;
  const pstRate = PST_RATES[upperProvince];
  if (!pstRate) return 0;
  return Math.round(subtotal * pstRate);
}

/**
 * Calculate QST amount for Quebec
 */
export function calculateQST(subtotal: number): number {
  return Math.round(subtotal * QST_RATE);
}

/**
 * Calculate HST amount (for HST provinces)
 */
export function calculateHST(
  subtotal: number,
  province?: CanadianProvince | string | null
): number {
  if (!province) return 0;
  const upperProvince = province.toUpperCase() as CanadianProvince;
  // HST provinces
  if (["NB", "NL", "NS", "ON", "PE"].includes(upperProvince)) {
    const hstRate = getTaxRate(province);
    return Math.round(subtotal * hstRate);
  }
  return 0;
}

/**
 * Calculate total tax amount based on subtotal and province
 */
export function calculateTax(
  subtotal: number,
  province?: CanadianProvince | string | null
): number {
  if (!province) {
    // Default to Ontario HST
    return calculateHST(subtotal, "ON");
  }
  
  const upperProvince = province.toUpperCase() as CanadianProvince;
  
  // HST provinces - return HST amount
  if (["NB", "NL", "NS", "ON", "PE"].includes(upperProvince)) {
    return calculateHST(subtotal, province);
  }
  
  // Quebec - GST + QST
  if (upperProvince === "QC") {
    return calculateGST(subtotal) + calculateQST(subtotal);
  }
  
  // GST + PST provinces
  if (["BC", "MB", "SK"].includes(upperProvince)) {
    return calculateGST(subtotal) + calculatePST(subtotal, province);
  }
  
  // GST only provinces/territories
  return calculateGST(subtotal);
}

/**
 * Calculate total including tax
 */
export function calculateTotal(
  subtotal: number,
  province?: CanadianProvince | string | null
): number {
  const tax = calculateTax(subtotal, province);
  return subtotal + tax;
}

/**
 * Get tax breakdown for a province
 */
export function getTaxBreakdown(province?: CanadianProvince | string | null): {
  gst: number;
  pst: number | null;
  qst: number | null;
  hst: number | null;
} {
  if (!province) {
    return { gst: 0, pst: null, qst: null, hst: null };
  }
  
  const upperProvince = province.toUpperCase() as CanadianProvince;
  
  // HST provinces
  if (["NB", "NL", "NS", "ON", "PE"].includes(upperProvince)) {
    return { gst: 0, pst: null, qst: null, hst: 0 };
  }
  
  // Quebec
  if (upperProvince === "QC") {
    return { gst: 0, pst: null, qst: 0, hst: null };
  }
  
  // GST + PST provinces
  if (["BC", "MB", "SK"].includes(upperProvince)) {
    return { gst: 0, pst: 0, qst: null, hst: null };
  }
  
  // GST only
  return { gst: 0, pst: null, qst: null, hst: null };
}

/**
 * Check if province uses HST (Harmonized Sales Tax)
 */
export function isHSTProvince(province?: CanadianProvince | string | null): boolean {
  if (!province) return false;
  const upperProvince = province.toUpperCase() as CanadianProvince;
  return ["NB", "NL", "NS", "ON", "PE"].includes(upperProvince);
}

/**
 * Check if province uses separate GST + PST
 */
export function isGSTPSTProvince(province?: CanadianProvince | string | null): boolean {
  if (!province) return false;
  const upperProvince = province.toUpperCase() as CanadianProvince;
  return ["BC", "MB", "SK"].includes(upperProvince);
}

/**
 * Check if province is Quebec (uses GST + QST)
 */
export function isQuebec(province?: CanadianProvince | string | null): boolean {
  if (!province) return false;
  return province.toUpperCase() === "QC";
}

