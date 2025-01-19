import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { authRoutes } from "./auth.routes";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(authRoutes)
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
