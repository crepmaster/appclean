import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthGuard } from "~/core/guards/auth.guard";

const routes: Routes = [
    { 
        path: "", 
        redirectTo: "/auth/login", 
        pathMatch: "full" 
    },
    {
        path: "auth",
        loadChildren: () => import("~/features/auth/auth.module")
            .then(m => m.AuthModule)
    },
    {
        path: "pharmacy",
        loadChildren: () => import("~/features/pharmacy/pharmacy.module")
            .then(m => m.PharmacyModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
