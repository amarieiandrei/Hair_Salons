import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";

import { LoginService } from "src/app/services/login.service";
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    SweetAlert2Module.forRoot(),
    RouterModule,
  ],
  providers: [LoginService],
  exports: [LoginComponent],
})
export class LoginModule {}
