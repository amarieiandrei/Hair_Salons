import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // * Fields
  public user!: any;

  constructor(private _configService: ConfigService, private _router: Router) {}

  ngOnInit(): void {
    this._configService.getProfile().subscribe(
      (profile: any) => {
        this.user = profile.user;
      },
      (err: any) => {
        console.log(err);
        return false;
      }
    );
  }

  public onLogoutClicked = (): void => {
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
