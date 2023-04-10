import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MainModule } from "./components/main/main.module";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { SectionComponent } from "./components/section/section.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, MainModule],
  providers: [],
  exports: [DashboardComponent],
})
export class DashboardModule {}
