import { Component, Input } from "@angular/core";
import {
  faGreaterThan,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ImageSliderInterface } from "../image-slider/types/image-slider.interface";

@Component({
  selector: "app-hair-salons",
  templateUrl: "./hair-salons.component.html",
  styleUrls: ["./hair-salons.component.scss"],
})
export class HairSalonsComponent {
  // ! Icons
  faGreaterThan = faGreaterThan;
  faMapLocationDot = faMapLocationDot;

  // ! Fields
  @Input() isHideMap = false;
  details: string = "Details";
  isDetails: boolean = false;
  location: string = "Romania, Bucharest";
  reviews: number = 0;
  cards: Array<any> = [1, 2, 3, 4];
  slides: ImageSliderInterface[] = [
    {
      url: "/assets/dashboard/salon1.jpeg",
      title: "salon1",
    },
    { url: "/assets/dashboard/salon2.jpg", title: "salon2" },
    { url: "/assets/dashboard/salon3.avif", title: "salon3" },
    { url: "/assets/dashboard/salon4.jpg", title: "salon4" },
  ];

  constructor() {}

  showDetails() {
    this.isDetails = !this.isDetails;
    !this.isDetails ? (this.details = "Details") : (this.details = "Close");
  }
}
