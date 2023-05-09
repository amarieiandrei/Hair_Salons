import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MainModule } from "./components/main/main.module";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { SectionComponent } from "./components/section/section.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HairsalonsService } from "src/app/services/hairsalons.service";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MainModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [HairsalonsService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
