import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoogleMapsModule } from "@angular/google-maps";
import { RatingModule } from "ngx-bootstrap/rating";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { MainComponent } from "./components/main/main.component";
import { GoogleMapComponent } from "./components/google-map/google-map.component";
import { HairSalonsComponent } from "./components/hair-salons/hair-salons.component";
import { ImageSliderComponent } from "./components/image-slider/image-slider.component";
import { RatingSliderComponent } from "./components/rating-slider/rating-slider.component";
import { DetailsComponent } from "./components/details/details.component";

@NgModule({
  declarations: [
    MainComponent,
    GoogleMapComponent,
    HairSalonsComponent,
    ImageSliderComponent,
    RatingSliderComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    RatingModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  exports: [MainComponent],
})
export class MainModule {}
