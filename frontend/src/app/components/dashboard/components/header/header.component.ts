import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(private _configService: ConfigService, private _router: Router) {}

  public onLogout = (): void => {
    this._configService.logout();

    Swal.fire({
      position: "top",
      icon: "success",
      title: "You are Succesfully Logged out!",
      showConfirmButton: false,
      timer: 1125,
    });

    (() => {
      setTimeout(() => {
        this._router.navigate(["/login"]);
      }, 1000);
    })();
  };
}
