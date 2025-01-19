import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medicine, MedicineStatus } from "../../models/medicine.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class PharmacyService {
    constructor(private authService: AuthService) {}

    getDashboardStats(): Observable<{
        totalMedicines: number;
        expiringSoon: number;
        availableForExchange: number;
        pendingExchanges: number;
    }> {
        return new Observable(subscriber => {
            // Mock dashboard statistics
            subscriber.next({
                totalMedicines: 150,
                expiringSoon: 12,
                availableForExchange: 45,
                pendingExchanges: 3
            });
            subscriber.complete();
        });
    }
}
