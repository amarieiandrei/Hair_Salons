import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ModalModule.forRoot(), FormsModule],
  providers: [],
  exports: [LoginComponent],
})
export class LoginModule {}
