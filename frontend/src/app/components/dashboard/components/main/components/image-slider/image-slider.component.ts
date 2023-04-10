import { Component, Input } from "@angular/core";
import { ImageSliderInterface } from "./types/image-slider.interface";

@Component({
  selector: "app-image-slider",
  templateUrl: "./image-slider.component.html",
  styleUrls: ["./image-slider.component.scss"],
})
export class ImageSliderComponent {
  // * Fields
  isArrows: boolean = false;
  @Input() slides: ImageSliderInterface[] = [];
  currentIndex: number = 0;

  hideArrows() {
    this.isArrows = false;
  }
  showArrows() {
    this.isArrows = true;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
}
