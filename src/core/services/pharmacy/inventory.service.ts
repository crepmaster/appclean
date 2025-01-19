import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medicine, MedicineStatus } from "../../models/medicine.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class InventoryService {
    constructor(private authService: AuthService) {}

    getMedicines(): Observable<Medicine[]> {
        return new Observable(subscriber => {
            const medicines: Medicine[] = [
                {
                    id: "1",
                    name: "Paracetamol",
                    manufacturer: "PharmaCo",
                    drugType: "Analgesic",
                    totalQuantity: 1000,
                    availableQuantity: 800,
                    exchangeableQuantity: 200,
                    batchNumber: "BATCH001",
                    expiryDate: new Date(2025, 5, 1),
                    pharmacyId: "1",
                    status: MedicineStatus.IN_STOCK,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            subscriber.next(medicines);
            subscriber.complete();
        });
    }

    addMedicine(medicine: Partial<Medicine>): Observable<Medicine> {
        return new Observable(subscriber => {
            const newMedicine: Medicine = {
                ...medicine,
                id: Math.random().toString(36).substr(2, 9),
                pharmacyId: this.authService.getCurrentUser()?.id || "",
                status: MedicineStatus.IN_STOCK,
                createdAt: new Date(),
                updatedAt: new Date()
            } as Medicine;
            subscriber.next(newMedicine);
            subscriber.complete();
        });
    }

    updateMedicine(id: string, updates: Partial<Medicine>): Observable<Medicine> {
        return new Observable(subscriber => {
            const updatedMedicine = { ...updates, id, updatedAt: new Date() } as Medicine;
            subscriber.next(updatedMedicine);
            subscriber.complete();
        });
    }

    setExchangeableQuantity(id: string, quantity: number): Observable<Medicine> {
        return new Observable(subscriber => {
            const updatedMedicine = {
                id,
                exchangeableQuantity: quantity,
                status: quantity > 0 ? MedicineStatus.AVAILABLE_FOR_EXCHANGE : MedicineStatus.IN_STOCK,
                updatedAt: new Date()
            } as Medicine;
            subscriber.next(updatedMedicine);
            subscriber.complete();
        });
    }
}
