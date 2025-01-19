export enum MedicineStatus {
    IN_STOCK = "in_stock",
    AVAILABLE_FOR_EXCHANGE = "available_for_exchange",
    PENDING_EXCHANGE = "pending_exchange",
    EXCHANGED = "exchanged",
    EXPIRED = "expired"
}

export interface Medicine {
    id: string;
    name: string;
    manufacturer: string;
    drugType: string;
    totalQuantity: number;
    availableQuantity: number;
    exchangeableQuantity: number;
    batchNumber: string;
    expiryDate: Date;
    pharmacyId: string;
    status: MedicineStatus;
    createdAt: Date;
    updatedAt: Date;
}
