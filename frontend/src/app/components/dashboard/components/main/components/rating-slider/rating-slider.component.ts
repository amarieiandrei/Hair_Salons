import { Component, Input } from "@angular/core";

@Component({
  selector: "app-rating-slider",
  templateUrl: "./rating-slider.component.html",
  styleUrls: ["./rating-slider.component.scss"],
})
export class RatingSliderComponent {
  // * @Input() decorator
  @Input() rating!: number;

  constructor() {}

  public max: number = 5;
}
