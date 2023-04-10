import { Component, EventEmitter, Output } from "@angular/core";
import {
  faCircle,
  faMagnifyingGlass,
  faXmark,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"],
})
export class SectionComponent {
  // * Icons
  public faMagnifyingGlass = faMagnifyingGlass;
  public faCircle = faCircle;
  public faMap = faMap;
  public mapBtnIcon: any = faXmark;

  // * Fields
  public mapBtnText: string = "Hide Map";
  items: Array<string> = [
    `Ladie's Haircuts`,
    `Men's Haircut`,
    `Hair Colouring`,
    `Blow Dry`,
    `Balayage`,
    `Blow Dry`,
    `Beard Trimming & Shaving`,
    `Children's Haircuts`,
  ];
  // * Emit to main for hide google-map
  @Output() msgToSibling = new EventEmitter<any>();
  private _isMap: boolean = true;

  // * Emit to main for show google-map
  @Output() msgToMainEvent = new EventEmitter<any>();
  private _showMap: boolean = false;

  constructor() {}

  public toogleMap = (): void => {
    this._isMap = !this._isMap;

    this.mapBtnIcon = this.mapBtnIcon === faMap ? faXmark : faMap;

    this.mapBtnText =
      this.mapBtnText.localeCompare("Hide Map") === 0 ? "Show Map" : "Hide Map";
  };

  msgToSib() {
    this.msgToSibling.emit(!this._isMap);
  }

  public showMap = (): void => {
    this._showMap = !this._showMap;
    console.log("Show Map", this._showMap);
  };

  msgToMain() {
    this.msgToMainEvent.emit(this._showMap);
  }
}
