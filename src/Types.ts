// src/types/drugTypes.ts
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
// Add this for frontend product representation
export interface Product
  extends Omit<
    DrugDto,
    | "ma"
    | "manufacturer"
    | "activeIngredient"
    | "ndc"
    | "atcCode"
    | "controlledSubstanceStatus"
    | "batchNumber"
    | "expirationDate"
  > {
  // You can add any additional frontend-specific properties here
}
