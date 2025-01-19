import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Exchange, ExchangeStatus } from "../../models/exchange.model";
import { Medicine } from "../../models/medicine.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class ExchangeService {
    constructor(private authService: AuthService) {}

    getExchanges(): Observable<Exchange[]> {
        return new Observable(subscriber => {
            const exchanges: Exchange[] = [
                {
                    id: "1",
                    medicineId: "1",
                    requestingPharmacyId: "2",
                    offeringPharmacyId: "1",
                    quantity: 100,
                    status: ExchangeStatus.PROPOSED,
                    deliveryAddress: "123 Pharmacy Street",
                    estimatedDeliveryTime: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            subscriber.next(exchanges);
            subscriber.complete();
        });
    }

    proposeExchange(medicineId: string, quantity: number): Observable<Exchange> {
        return new Observable(subscriber => {
            const newExchange: Exchange = {
                id: Math.random().toString(36).substr(2, 9),
                medicineId,
                requestingPharmacyId: this.authService.getCurrentUser()?.id || "",
                offeringPharmacyId: "",
                quantity,
                status: ExchangeStatus.PROPOSED,
                deliveryAddress: this.authService.getCurrentUser()?.pharmacyAddress || "",
                estimatedDeliveryTime: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            subscriber.next(newExchange);
            subscriber.complete();
        });
    }

    updateExchangeStatus(exchangeId: string, status: ExchangeStatus): Observable<Exchange> {
        return new Observable(subscriber => {
            const updatedExchange: Partial<Exchange> = {
                id: exchangeId,
                status,
                updatedAt: new Date()
            };
            subscriber.next(updatedExchange as Exchange);
            subscriber.complete();
        });
    }
}
