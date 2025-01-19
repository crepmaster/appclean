export enum ExchangeStatus {
    PROPOSED = "proposed",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    IN_TRANSIT = "in_transit",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}

export interface Exchange {
    id: string;
    medicineId: string;
    requestingPharmacyId: string;
    offeringPharmacyId: string;
    quantity: number;
    status: ExchangeStatus;
    courierId?: string;
    deliveryAddress: string;
    estimatedDeliveryTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
