import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/components/dashboard/dashboard.component";
import { RegisterComponent } from "./components/register/components/register/register.component";
import { LoginComponent } from "./components/login/components/login/login.component";
import { ProfileComponent } from "./components/profile/components/profile/profile.component";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
