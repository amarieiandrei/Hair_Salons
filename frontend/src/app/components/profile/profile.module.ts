import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

import { ProfileComponent } from "./components/profile/profile.component";

import { ConfigService } from "src/app/services/config.service";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule, MatButtonModule],
  providers: [ConfigService],
  exports: [ProfileComponent],
})
export class ProfileModule {}
