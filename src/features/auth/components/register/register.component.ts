import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "~/core/services/auth/auth.service";

@Component({
    moduleId: module.id,
    selector: "ns-register",
    templateUrl: "./register.component.html",
    standalone: false
})
export class RegisterComponent {
    userData = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phoneNumber: "",
        pharmacyName: "",
        pharmacyAddress: "",
        licenseNumber: ""
    };

    isLoading = false;
    errorMessage = "";

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onRegister(): void {
        if (this.validateForm()) {
            this.isLoading = true;
            this.errorMessage = "";

            this.authService.register(this.userData)
                .subscribe({
                    next: (user) => {
                        this.isLoading = false;
                        this.router.navigate(["/auth/login"], { 
                            queryParams: { registered: true }
                        });
                    },
                    error: (error) => {
                        this.isLoading = false;
                        this.errorMessage = "Registration failed. Please try again.";
                        console.error("Registration error:", error);
                    }
                });
        }
    }

    private validateForm(): boolean {
        if (!this.userData.email || !this.userData.password || !this.userData.name || 
            !this.userData.phoneNumber || !this.userData.pharmacyName || 
            !this.userData.pharmacyAddress || !this.userData.licenseNumber) {
            this.errorMessage = "Please fill in all required fields";
            return false;
        }

        if (this.userData.password !== this.userData.confirmPassword) {
            this.errorMessage = "Passwords do not match";
            return false;
        }

        if (this.userData.password.length < 6) {
            this.errorMessage = "Password must be at least 6 characters";
            return false;
        }

        return true;
    }
}
