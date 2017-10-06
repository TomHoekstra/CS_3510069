import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { StudentStartComponent } from "./student/student-start/student-start.component";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { QuizCreatorComponent } from "./admin/quiz-creator/quiz-creator.component";

const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "student", component: StudentStartComponent },
    { path: "admin", component: AdminStartComponent},
    { path: "quiz/creator", component: QuizCreatorComponent},
    { path: "**", redirectTo: "" }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);