import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { ExchangeComponent } from "./components/exchange/exchange.component";
import { pharmacyRoutes } from "./pharmacy.routes";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(pharmacyRoutes)
    ],
    declarations: [
        DashboardComponent,
        InventoryComponent,
        ExchangeComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PharmacyModule { }
