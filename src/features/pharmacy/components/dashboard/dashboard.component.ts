import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PharmacyService } from "~/core/services/pharmacy/pharmacy.service";
import { AuthService } from "~/core/services/auth/auth.service";
import { User } from "~/core/models/user.model";

@Component({
    moduleId: module.id,
    selector: "ns-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
    standalone: false
})
export class DashboardComponent implements OnInit {
    stats = {
        totalMedicines: 0,
        expiringSoon: 0,
        availableForExchange: 0,
        pendingExchanges: 0
    };
    currentUser: User | null = null;
    isLoading = true;
    errorMessage = "";

    constructor(
        private pharmacyService: PharmacyService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.loadDashboardData();
    }

    loadDashboardData() {
        this.isLoading = true;
        this.errorMessage = "";

        this.pharmacyService.getDashboardStats()
            .subscribe({
                next: (stats) => {
                    this.stats = stats;
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = "Failed to load dashboard data";
                    this.isLoading = false;
                    console.error("Dashboard error:", error);
                }
            });
    }

    onInventoryTap() {
        this.router.navigate(["/pharmacy/inventory"]);
    }

    onExchangesTap() {
        this.router.navigate(["/pharmacy/exchanges"]);
    }

    onProfileTap() {
        this.router.navigate(["/auth/profile"]);
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(["/auth/login"]);
    }
}
