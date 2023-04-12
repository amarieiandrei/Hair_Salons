import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements AfterViewInit {
  // * Modal
  public modalRef?: BsModalRef;
  @ViewChild("loginModal") loginModal!: TemplateRef<any>;

  constructor(private _router: Router, private _modalService: BsModalService) {}

  ngAfterViewInit(): void {
    this.openModal(this.loginModal);
  }

  public openModal = (loginModal: TemplateRef<any>): void => {
    this.modalRef = this._modalService.show(loginModal);
  };

  public navigateLogin = (): void => {
    this._router.navigate(["/login"]);
  };

  public onSubmit = (values: any): void => {
    console.log(values);
  };
}
