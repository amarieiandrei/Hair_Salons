import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  isHideMap = false;
  showMap!: boolean;
  public hairsalons!: Array<any>;
  public isSearchedByNameTouched!: boolean;
  public isSearchedByLocationTouched!: boolean;
  public hairsalonsByLocation!: Array<any>;
  public hairsalonsByProgram!: Array<any>;

  fwdMsgToSib2($event: any) {
    this.isHideMap = $event;
  }

  fwdMsgToMain2($event: any) {
    this.showMap = $event;
  }

  public searchedHairsalons = ($event: any) => {
    this.hairsalons = $event;
  };

  public searchedHairsalonsByLocation = ($event: any) => {
    this.hairsalonsByLocation = $event;
  };

  public searchedByNameTouched = ($event: any): void => {
    this.isSearchedByNameTouched = $event;
  };

  public searchedByLocationTouched = ($event: any): void => {
    this.isSearchedByLocationTouched = $event;
  };

  public searchedHairsalonsByProgram = ($event: any): void => {
    this.hairsalonsByProgram = $event;
  };
}
