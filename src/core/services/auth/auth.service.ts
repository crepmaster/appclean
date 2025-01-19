import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User, UserRole } from "../../models/user.model";
import { environment } from "~/environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly DEMO_EMAIL = "demo@pharmacy.com";
    private readonly DEMO_PASSWORD = "demo123";

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    login(email: string, password: string): Observable<User> {
        return new Observable(subscriber => {
            if (email === this.DEMO_EMAIL && password === this.DEMO_PASSWORD) {
                const mockUser: User = {
                    id: "1",
                    email: email,
                    role: UserRole.PHARMACIST,
                    name: "Demo User",
                    phoneNumber: "1234567890",
                    pharmacyName: "Demo Pharmacy",
                    pharmacyAddress: "123 Demo Street",
                    licenseNumber: "LIC123",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                
                this.currentUserSubject.next(mockUser);
                subscriber.next(mockUser);
                subscriber.complete();
            } else {
                subscriber.error(new Error("Invalid credentials"));
            }
        });
    }

    register(userData: Partial<User>): Observable<User> {
        return new Observable(subscriber => {
            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                email: userData.email!,
                role: UserRole.PHARMACIST,
                name: userData.name!,
                phoneNumber: userData.phoneNumber!,
                pharmacyName: userData.pharmacyName,
                pharmacyAddress: userData.pharmacyAddress,
                licenseNumber: userData.licenseNumber,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            subscriber.next(newUser);
            subscriber.complete();
        });
    }

    logout(): void {
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
