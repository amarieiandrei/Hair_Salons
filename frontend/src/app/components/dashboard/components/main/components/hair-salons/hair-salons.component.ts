import { Component, Input, OnChanges, OnInit } from "@angular/core";
import {
  faGreaterThan,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ConfigService } from "src/app/services/config.service";
import { HairsalonsService } from "src/app/services/hairsalons.service";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "app-hair-salons",
  templateUrl: "./hair-salons.component.html",
  styleUrls: ["./hair-salons.component.scss"],
})
export class HairSalonsComponent implements OnInit, OnChanges {
  // * Icons
  faGreaterThan = faGreaterThan;
  faMapLocationDot = faMapLocationDot;

  // * @Input() Decorator
  @Input() isHideMap = false;
  @Input() searchedHairsalons!: Array<any>;
  @Input() isSearchedByNameTouched!: boolean;
  @Input() searchedHairsalonsByLocation!: Array<any>;

  // * Fields
  public isSearchedHairsalonsByLocation: boolean = false;
  public isSearchedHairsalons: boolean = false;

  public showLoader$ = this._loaderService.loadingAction$;

  public hairsalons!: Array<any>;

  constructor(
    private _configService: ConfigService,
    private _loaderService: LoaderService,
    private _hairsalonsService: HairsalonsService
  ) {}

  ngOnChanges(): void {
    if (this.isSearchedByNameTouched === true) {
      this.ngOnChangesSearchedHairsalons();
    } else {
      this.ngOnChangesSearchedHairsalonsByLocation();
    }
  }

  // ngOnInit(): void {}

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

  public ngOnChangesSearchedHairsalons = (): void => {
    if (this.searchedHairsalons !== undefined) {
      setTimeout(() => {
        this._loaderService.showLoader();
      }, 0);

      this.hairsalons = this.searchedHairsalons;

      setTimeout(() => {
        this._loaderService.hideLoader();
      }, 0);
    }

    if (this.searchedHairsalons?.length === 0) {
      this.isSearchedHairsalons = true;

      setTimeout(() => {
        this.hairsalons =
          this._hairsalonsService.loadHairsalonsFromLocalStorage();
        this.isSearchedHairsalons = false;
      }, 1500);
    }
  };

  public ngOnChangesSearchedHairsalonsByLocation = (): void => {
    if (this.searchedHairsalonsByLocation !== undefined) {
      setTimeout(() => {
        this._loaderService.showLoader();
      }, 0);

      this.hairsalons = this.searchedHairsalonsByLocation;

      setTimeout(() => {
        this._loaderService.hideLoader();
      }, 0);
    }

    if (this.searchedHairsalonsByLocation?.length === 0) {
      this.isSearchedHairsalonsByLocation = true;

      setTimeout(() => {
        this.hairsalons =
          this._hairsalonsService.loadHairsalonsFromLocalStorage();

        this.isSearchedHairsalonsByLocation = false;
      }, 1500);
    }
  };

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
