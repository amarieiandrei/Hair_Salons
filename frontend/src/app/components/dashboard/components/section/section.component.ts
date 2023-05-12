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
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { HairsalonsService } from "src/app/services/hairsalons.service";
import * as moment from "moment";

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
  public faXmarkIcon = faXmark;
  public faClock = faClock;
  public faCalendarDay = faCalendarDay;
  public faLocationDot = faLocationDot;
  public faMagnifyingGlass = faMagnifyingGlass;
  public faCircle = faCircle;
  public faMap = faMap;
  public mapBtnIcon: any = faXmark;

  // * Fields
  public datePickerValue!: any;
  public isMeridian: boolean = false;
  public chooseProgramDay!: string;
  public chooseProgramTime: Date = new Date();

  public isProgram: boolean = false;

  public wwwMenuOpen!: string;

  public isSearchedByLocationTouched: boolean = false;
  public isSearchedByNameTouched: boolean = false;

  public disableSearchCalendar: boolean = false;
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

  // * @Output(), EventEmitter => SearchedHairsalons by Name.
  @Output() searchedHairsalonsEvent = new EventEmitter<any>();
  @Output() searchedByNameTouchedEvent = new EventEmitter<any>();
  @Output() searchedHairsalonsByLocationEvent = new EventEmitter<any>();
  @Output() searchedByLocationTouchedEvent = new EventEmitter<any>();
  @Output() searchedHairsalonsByProgramEvent = new EventEmitter<any>();
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
    this.isProgram = false;
    this.datePickerValue = "";

    this.onFocusoutCalendar();

    let title = document.getElementById("section-title-blur");

    // * For Safari
    if (title !== null && document.body.scrollTop === 0) {
      title.style.transitionDuration = ".8s";
      title.style.transform = "translate(0)";
    }
    // * For Chrome, Firefox, IE and Opera
    if (title !== null && document.documentElement.scrollTop === 0) {
      title.style.transitionDuration = ".8s";
      title.style.transform = "translate(0)";
    }

    if (title !== null) {
      if (
        document.body.scrollTop !== 0 ||
        document.documentElement.scrollTop !== 0
      ) {
        title.style.transitionDuration = ".8s";
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

    this.isSearchedByLocationTouched = true;
    this.searchedByLocationTouchedEvent.emit(this.isSearchedByLocationTouched);

    this.isSearchedByNameTouched = false;
    this.searchedByNameTouchedEvent.emit(this.isSearchedByNameTouched);

    this.searchLocation = "";
  };

  public onSearchingCalendar = (day: any, hours: any): void => {
    const hairsalons = this._hairsalonsService.loadHairsalonsFromLocalStorage();

    const searchedHairsalonsByProgram = hairsalons.filter((hairsalon) => {
      return this._hairsalonsService.searchHairsalonsByProgram(
        hairsalon.program,
        day,
        hours
      );
    });

    this.isSearchedByNameTouched = false;
    this.searchedByNameTouchedEvent.emit(this.isSearchedByNameTouched);

    this.isSearchedByLocationTouched = false;
    this.searchedByLocationTouchedEvent.emit(this.isSearchedByLocationTouched);

    this.searchedHairsalonsByProgramEvent.emit(searchedHairsalonsByProgram);
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

    this.datePickerValue = "";
    this.chooseProgramDay = "";
  };

  public onFocusoutCalendar = (): void => {
    this.disableSearchName = false;
    this.disableSearchLocation = false;

    this.isProgram = false;
    this.chooseProgramDay = "";
  };

  public onChooseProgramClicked = (): void => {
    this.isProgram = true;
  };

  public onClickToday = (): void => {
    this.chooseProgramDay = moment().format("dddd");
    this.datePickerValue = "";
  };

  public onClickTomorrow = (): void => {
    this.chooseProgramDay = moment().add(1, "days").format("dddd");
    this.datePickerValue = "";
  };

  public onClickAnyDate = (): void => {
    this.chooseProgramDay = "Any Date";
    this.datePickerValue = "";
  };

  public onDoneProgram = (): void => {
    const hoursHour = this.chooseProgramTime.getHours();
    const hoursMinutes = this.chooseProgramTime.getMinutes();
    const hours = `${hoursHour}:${hoursMinutes}`;

    const formatedDatePickerValue = moment(this.datePickerValue).format("dddd");

    if (
      formatedDatePickerValue.localeCompare("Monday") === 0 ||
      formatedDatePickerValue.localeCompare("Tuesday") === 0 ||
      formatedDatePickerValue.localeCompare("Wednesday") === 0 ||
      formatedDatePickerValue.localeCompare("Thursday") === 0 ||
      formatedDatePickerValue.localeCompare("Friday") === 0 ||
      formatedDatePickerValue.localeCompare("Saturday") === 0 ||
      formatedDatePickerValue.localeCompare("Sunday") === 0
    ) {
      this.chooseProgramDay = formatedDatePickerValue;
    }

    this.onSearchingCalendar(this.chooseProgramDay, hours);
  };

  public handleRestartField = (): void => {
    this.chooseProgramDay = "";
    this.datePickerValue = "";
  };
}
