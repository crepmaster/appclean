import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "~/core/services/auth/auth.service";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "./login.component.html",
    standalone: false
})
export class LoginComponent {
    email: string = "";
    password: string = "";
    isLoading: boolean = false;
    errorMessage: string = "";

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onLogin(): void {
        if (!this.email || !this.password) {
            this.errorMessage = "Please enter both email and password";
            return;
        }

        this.isLoading = true;
        this.errorMessage = "";

        this.authService.login(this.email, this.password)
            .subscribe({
                next: (user) => {
                    this.isLoading = false;
                    this.router.navigate(["/pharmacy"]);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.errorMessage = "Login failed. Please check your credentials.";
                    console.error("Login error:", error);
                }
            });
    }
}
