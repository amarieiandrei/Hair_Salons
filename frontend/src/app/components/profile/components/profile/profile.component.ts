import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  // * Fields
  public user!: any;
  public subscription: Subscription = new Subscription();

  constructor(private _configService: ConfigService, private _router: Router) {}

  ngOnInit(): void {
    this._getProfile();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private _getProfile = (): any => {
    this.subscription.add(
      this._configService.getProfile().subscribe((profile) => {
        this.user = profile.user;
      })
    );
  };

  public onLogoutClicked = (): void => {
    this._configService.logout();
    this._router.navigate(["/login"]);
  };
}
