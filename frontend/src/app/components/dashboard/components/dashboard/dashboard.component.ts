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
  public hairsalonsByLocation!: Array<any>;

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
}
