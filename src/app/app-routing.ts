import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent } from "./account/register/register.component";
import { StudentStartComponent } from "./student/student-start/student-start.component";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { QuizCreatorComponent } from "./admin/quiz-creator/quiz-creator.component";
import { QuizOverviewComponent } from "./admin/quiz-overview/quiz-overview.component";
import { StudentAuthGuard } from "./guard/student-auth.guard";
import { AdminAuthGuard } from "./guard/admin-auth.guard";
import { QuizMakerComponent } from "./student/quiz-maker/quiz-maker.component";

const routes: Routes = [
    { path: "", component: LoginComponent},
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent},
    { path: "student", component: StudentStartComponent, canActivate: [StudentAuthGuard] },
    { path: "admin", component: AdminStartComponent, canActivate: [AdminAuthGuard]},
    { path: "quiz/creator", component: QuizCreatorComponent, canActivate: [AdminAuthGuard]},
    { path: "quiz/creator/:id", component: QuizCreatorComponent, canActivate: [AdminAuthGuard]},
    { path: "quiz/maker", component: QuizMakerComponent, canActivate: [StudentAuthGuard]},
    { path: "quiz/maker/:id", component: QuizMakerComponent, canActivate: [StudentAuthGuard]},
    { path: "quiz/overview", component: QuizOverviewComponent, canActivate: [AdminAuthGuard]},
    { path: "**", redirectTo: "" }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);