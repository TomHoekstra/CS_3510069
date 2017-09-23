import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";

const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "**", redirectTo: "" }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);