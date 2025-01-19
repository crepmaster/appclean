import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { ExchangeComponent } from "./components/exchange/exchange.component";

export const pharmacyRoutes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "inventory", component: InventoryComponent },
    { path: "exchanges", component: ExchangeComponent }
];
