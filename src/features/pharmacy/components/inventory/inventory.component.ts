import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Medicine, MedicineStatus } from "~/core/models/medicine.model";
import { InventoryService } from "~/core/services/pharmacy/inventory.service";

@Component({
    moduleId: module.id,
    selector: "ns-inventory",
    templateUrl: "./inventory.component.html",
    styleUrls: ["./inventory.component.css"],
    standalone: false
})
export class InventoryComponent implements OnInit {
    medicines: Medicine[] = [];
    isLoading = false;
    errorMessage = "";
    showAddDialog = false;
    newMedicine: Partial<Medicine> = {};
    selectedMedicine: Medicine | null = null;

    constructor(private inventoryService: InventoryService) {}

    ngOnInit() {
        this.loadInventory();
    }

    loadInventory() {
        this.isLoading = true;
        this.errorMessage = "";

        this.inventoryService.getMedicines().subscribe({
            next: (medicines) => {
                this.medicines = medicines;
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = "Failed to load inventory";
                this.isLoading = false;
                console.error("Inventory error:", error);
            }
        });
    }

    onAddMedicine() {
        if (!this.validateMedicine(this.newMedicine)) {
            return;
        }

        this.isLoading = true;
        this.inventoryService.addMedicine(this.newMedicine).subscribe({
            next: (medicine) => {
                this.medicines.push(medicine);
                this.showAddDialog = false;
                this.newMedicine = {};
                this.isLoading = false;
            },
            error: (error) => {
                this.errorMessage = "Failed to add medicine";
                this.isLoading = false;
            }
        });
    }

    onSetExchangeable(medicine: Medicine) {
        this.selectedMedicine = medicine;
    }

    onUpdateExchangeableQuantity(quantity: number) {
        if (!this.selectedMedicine) return;

        this.isLoading = true;
        this.inventoryService.setExchangeableQuantity(this.selectedMedicine.id, quantity)
            .subscribe({
                next: (updatedMedicine) => {
                    const index = this.medicines.findIndex(m => m.id === updatedMedicine.id);
                    if (index !== -1) {
                        this.medicines[index] = { ...this.medicines[index], ...updatedMedicine };
                    }
                    this.selectedMedicine = null;
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = "Failed to update exchangeable quantity";
                    this.isLoading = false;
                }
            });
    }

    private validateMedicine(medicine: Partial<Medicine>): boolean {
        if (!medicine.name || !medicine.manufacturer || !medicine.totalQuantity || !medicine.expiryDate) {
            this.errorMessage = "Please fill in all required fields";
            return false;
        }
        return true;
    }
}
