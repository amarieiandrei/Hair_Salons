import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MainModule } from "./components/main/main.module";
import { RouterModule } from "@angular/router";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { SectionComponent } from "./components/section/section.component";
import { FooterComponent } from "./components/footer/footer.component";

import { ConfigService } from "src/app/services/config.service";

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
    SweetAlert2Module.forRoot(),
  ],
  providers: [ConfigService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
