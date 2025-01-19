import { Component, OnInit } from "@angular/core";
import { AuthService } from "~/core/services/auth/auth.service";
import { User } from "~/core/models/user.model";

@Component({
    moduleId: module.id,
    selector: "ns-profile",
    templateUrl: "./profile.component.html",
    standalone: false
})
export class ProfileComponent implements OnInit {
    user: User | null = null;
    isEditing = false;
    isSaving = false;
    errorMessage = "";
    successMessage = "";

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getCurrentUser();
    }

    onEdit(): void {
        this.isEditing = true;
    }

    onSave(): void {
        if (!this.user || !this.user.id) return;

        this.isSaving = true;
        this.errorMessage = "";
        this.successMessage = "";

        this.authService.updateProfile(this.user.id, this.user)
            .subscribe({
                next: (updatedUser) => {
                    this.isSaving = false;
                    this.isEditing = false;
                    this.successMessage = "Profile updated successfully";
                },
                error: (error) => {
                    this.isSaving = false;
                    this.errorMessage = "Failed to update profile";
                }
            });
    }
}
