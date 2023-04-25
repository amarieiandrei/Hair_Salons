import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { RegisterComponent } from "./components/register/register.component";

import { RegisterService } from "src/app/services/register.service";
import { ConfigService } from "src/app/services/config.service";
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [RegisterService, ConfigService],
  exports: [RegisterComponent],
})
export class RegisterModule {}
