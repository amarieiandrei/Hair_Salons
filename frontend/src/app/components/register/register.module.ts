import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";

import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, ModalModule.forRoot(), FormsModule],
  providers: [],
  exports: [RegisterComponent],
})
export class RegisterModule {}
