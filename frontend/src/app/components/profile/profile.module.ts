import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { ProfileComponent } from "./components/profile/profile.component";

import { ConfigService } from "src/app/services/config.service";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule, SweetAlert2Module.forRoot()],
  providers: [ConfigService],
  exports: [ProfileComponent],
})
export class ProfileModule {}
