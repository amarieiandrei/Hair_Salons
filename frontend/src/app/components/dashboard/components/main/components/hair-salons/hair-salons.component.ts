import { Component, Input, OnInit } from "@angular/core";
import {
  faGreaterThan,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ConfigService } from "src/app/services/config.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-hair-salons",
  templateUrl: "./hair-salons.component.html",
  styleUrls: ["./hair-salons.component.scss"],
})
export class HairSalonsComponent implements OnInit {
  // * Icons
  faGreaterThan = faGreaterThan;
  faMapLocationDot = faMapLocationDot;

  // * @Input() Decorator
  @Input() isHideMap = false;

  // * Fields
  public showLoader$ = this._loaderService.loadingAction$;

  public hairsalons!: Array<any>;

  constructor(
    private _configService: ConfigService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._loaderService.showLoader();
    }, 0);

    this._configService.getHairsalons().subscribe(
      (hairsalons: any) => {
        this.hairsalons = hairsalons;
        localStorage.setItem("hairsalons", JSON.stringify(this.hairsalons));
        this._loaderService.hideLoader();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public showDetails = (index: number): void => {
    const isDetails = this.hairsalons[index].details.isDetails;

    this.hairsalons[index].details.isDetails =
      !this.hairsalons[index].details.isDetails;

    !isDetails
      ? (this.hairsalons[index].details.text = "Close")
      : (this.hairsalons[index].details.text = "Details");
  };

  public onShowOnMapClicked = (index: number): void => {
    console.log(`Show on Map ${index}`);
  };
}
