/**
 * Defines the structure for a Post object.
 */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Represents a drug with its details.
 */
export interface DrugDto {
  id: number;
  ma: string;
  price: number;
  brandName: string;
  manufacturer: string;
  activeIngredient: string;
  ndc: string;
  atcCode: string;
  drugForm: string;
  routeOfAdministration: string;
  prescriptionStatus: string;
  controlledSubstanceStatus: string;
  contraindications: string;
  sideEffects: string;
  dosage: string;
  batchNumber: string;
  expirationDate: string;
  storageConditions: string;
  isAvailable: boolean;
  graphicLink: string;
}

/**
 * Represents data for creating a new drug.
 */
export interface CreateDrugDto {
  ma: string;
  price: number;
  brandName: string;
  manufacturer: string;
  activeIngredient: string;
  ndc: string;
  atcCode: string;
  drugForm: string;
  routeOfAdministration: string;
  prescriptionStatus: string;
  controlledSubstanceStatus: string;
  contraindications: string;
  sideEffects: string;
  dosage: string;
  batchNumber: string;
  expirationDate: string;
  storageConditions: string;
  availableCopies: number;
  graphicLink: string;
}

/**
 * Represents the response after creating a drug.
 */
export interface CreateDrugResponseDto {
  id: number;
  ma: string;
  price: number;
  brandName: string;
  manufacturer: string;
  activeIngredient: string;
  ndc: string;
  atcCode: string;
  drugForm: string;
  routeOfAdministration: string;
  prescriptionStatus: string;
  controlledSubstanceStatus: string;
  contraindications: string;
  sideEffects: string;
  dosage: string;
  batchNumber: string;
  expirationDate: string;
  storageConditions: string;
  availableCopies: number;
  graphicLink: string;
}
