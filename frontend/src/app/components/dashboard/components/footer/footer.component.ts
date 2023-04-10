import { Component } from "@angular/core";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  faApple = faApple;
  faGooglePlay = faGooglePlay;
  faArrowUp = faArrowUp;

  goToTop = (): void => {
    // * For Safari
    document.body.scrollTop = 0;
    // * For Chrome, Firefox, IE and Opera
    document.documentElement.scrollTop = 0;
  };
}
