import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  isHideMap = false;
  showMap!: boolean;

  fwdMsgToSib2($event: any) {
    this.isHideMap = $event;
  }

  fwdMsgToMain2($event: any) {
    this.showMap = $event;
  }
}
