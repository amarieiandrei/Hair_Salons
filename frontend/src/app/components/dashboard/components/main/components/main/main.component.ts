import { Component, Input } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  // * Fields
  @Input() isHideMap = false;
  @Input() showMap!: boolean;
  @Input() hairsalons!: Array<any>;
  @Input() isSearchedByNameTouched!: boolean;
  @Input() hairsalonsByLocation!: Array<any>;
  @Input() isSearchedByLocationTouched!: boolean;
  @Input() hairsalonsByProgram!: Array<any>;

  constructor() {}
}
