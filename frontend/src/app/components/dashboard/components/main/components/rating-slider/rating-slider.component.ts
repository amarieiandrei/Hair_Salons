import { Component } from "@angular/core";

@Component({
  selector: "app-rating-slider",
  templateUrl: "./rating-slider.component.html",
  styleUrls: ["./rating-slider.component.scss"],
})
export class RatingSliderComponent {
  max: number = 5;
  value: number = 5;
}
