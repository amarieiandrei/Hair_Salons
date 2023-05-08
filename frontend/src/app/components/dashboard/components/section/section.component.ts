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
  faLocationDot,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { HairsalonsService } from "src/app/services/hairsalons.service";

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
  public faCalendarDay = faCalendarDay;
  public faLocationDot = faLocationDot;
  public faMagnifyingGlass = faMagnifyingGlass;
  public faCircle = faCircle;
  public faMap = faMap;
  public mapBtnIcon: any = faXmark;

  // * Fields
  public wwwMenuOpen!: string;

  public isSearchedByNameTouched: boolean = false;

  public disableSearchCalendar: boolean = false;
  public disableSearchName: boolean = false;
  public disableSearchLocation: boolean = false;

  public searchName!: string;
  public searchLocation!: string;
  public searchCalendar!: any;

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

  // * @Output(), EventEmitter => SearchedHairsalons by Name.
  @Output() searchedHairsalonsEvent = new EventEmitter<any>();
  @Output() searchedByNameTouchedEvent = new EventEmitter<any>();
  @Output() searchedHairsalonsByLocationEvent = new EventEmitter<any>();

  // * Emit to main for hide google-map
  @Output() msgToSibling = new EventEmitter<any>();
  private _isMap: boolean = true;

  // * Emit to main for show google-map
  @Output() msgToMainEvent = new EventEmitter<any>();
  private _showMap: boolean = false;

  constructor(private _hairsalonsService: HairsalonsService) {}

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

    let title = document.getElementById("section-title-blur");

    // * For Safari
    if (title !== null && document.body.scrollTop === 0) {
      title.style.transitionDuration = "1s";
      title.style.transform = "translate(0)";
    }
    // * For Chrome, Firefox, IE and Opera
    if (title !== null && document.documentElement.scrollTop === 0) {
      title.style.transitionDuration = "1s";
      title.style.transform = "translate(0)";
    }

    if (title !== null) {
      if (
        document.body.scrollTop !== 0 ||
        document.documentElement.scrollTop !== 0
      ) {
        title.style.transitionDuration = "1s";
        title.style.transform = "translate(3ch, 7.5mm)";
      }
    }
  }

  public onSearchingName = (name: string): void => {
    const hairsalons = this._hairsalonsService.loadHairsalonsFromLocalStorage();

    const searchedHairsalons = hairsalons.filter((hairsalon) => {
      return this._hairsalonsService.searchHairsalonsByName(
        hairsalon.name,
        name
      );
    });

    this.searchedHairsalonsEvent.emit(searchedHairsalons);
    this.isSearchedByNameTouched = true;
    this.searchedByNameTouchedEvent.emit(this.isSearchedByNameTouched);

    this.searchName = "";
  };

  public onSearchingLocation = (location: string): void => {
    const hairsalons = this._hairsalonsService.loadHairsalonsFromLocalStorage();

    const searchedHairsalonsByLocation = hairsalons.filter((hairsalon) => {
      return this._hairsalonsService.searchHairsalonsByLocation(
        hairsalon.location,
        location
      );
    });

    this.searchedHairsalonsByLocationEvent.emit(searchedHairsalonsByLocation);
    this.isSearchedByNameTouched = false;
    this.searchedByNameTouchedEvent.emit(this.isSearchedByNameTouched);

    this.searchLocation = "";
  };

  public onSearchingCalendar = (program: any): void => {
    console.log("Handle on searching Calendar");

    this.searchCalendar = "";
  };

  public onFocusName = (): void => {
    this.disableSearchLocation = true;
    this.disableSearchCalendar = true;
  };

  public onFocusoutName = (): void => {
    this.disableSearchLocation = false;
    this.disableSearchCalendar = false;
  };

  public onFocusLocation = (): void => {
    this.disableSearchName = true;
    this.disableSearchCalendar = true;
  };

  public onFocusoutLocation = (): void => {
    this.disableSearchName = false;
    this.disableSearchCalendar = false;
  };

  public onFocusCalendar = (): void => {
    this.disableSearchName = true;
    this.disableSearchLocation = true;
  };

  public onFocusoutCalendar = (): void => {
    this.disableSearchName = false;
    this.disableSearchLocation = false;
  };
}
