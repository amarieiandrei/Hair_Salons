import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, EventEmitter, Output, HostListener } from "@angular/core";
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
  animations: [
    trigger("inputsAnimation", [
      transition("* => *", [
        query("input", style({ transform: "translateX(-15%)" })),
        query(
          "input",
          stagger("300ms", [
            animate("200ms", style({ transform: "translateX(0)" })),
          ])
        ),
      ]),
    ]),
  ],
})
export class SectionComponent {
  // * Icons
  public faMagnifyingGlass = faMagnifyingGlass;
  public faCircle = faCircle;
  public faMap = faMap;
  public mapBtnIcon: any = faXmark;

  // * Fields
  public disableSearchName: boolean = false;
  public disableSearchLocation: boolean = false;

  public searchName!: string;
  public searchLocation!: string;

  public isWhatWhereWhen: boolean = false;

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

  public goToTop = (): void => {
    // * For Safari
    document.body.scrollTop = 0;
    // * For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0;
  };

  public onSearchCliked = () => {
    this.isWhatWhereWhen = true;

    this.goToTop();

    setTimeout(() => {
      this.isWhatWhereWhen = true;
    }, 800);
  };

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isWhatWhereWhen = false;
  }

  public onSearchingName = (name: string): void => {
    console.log("Search by: ", name);

    this.searchName = "";
  };

  public onSearchingLocation = (location: string): void => {
    console.log("Search by: ", location);

    this.searchLocation = "";
  };

  public onFocusName = (): void => {
    this.disableSearchLocation = true;
  };

  public onFocusoutName = (): void => {
    this.disableSearchLocation = false;
  };

  public onFocusLocation = (): void => {
    this.disableSearchName = true;
  };

  public onFocusoutLocation = (): void => {
    this.disableSearchName = false;
  };
}
