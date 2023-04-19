import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LoginService } from "src/app/services/login.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements AfterViewInit {
  // * Fields
  public emptyFieldAlert: boolean = false;
  public emailAlert: boolean = false;
  public password!: string;
  public email!: string;
  public disableSubmit: boolean = true;

  // * Modal
  public modalRef?: BsModalRef;
  @ViewChild("loginModal") loginModal!: TemplateRef<any>;

  constructor(
    private _router: Router,
    private _modalService: BsModalService,
    private _loginService: LoginService
  ) {}

  ngAfterViewInit(): void {
    this.openModal(this.loginModal);
  }

  public openModal = (loginModal: TemplateRef<any>): void => {
    this.modalRef = this._modalService.show(loginModal);
  };

  private _closeModal = (): void => {
    this._modalService.hide();
  };

  public navigateLogin = (): void => {
    this._router.navigate(["/login"]);
  };

  public navigateRegister = (): void => {
    this._closeModal();
    (() => {
      setTimeout(() => {
        this._router.navigate(["/register"]);
      }, 250);
    })();
  };

  verifEmail = (email: string): void => {
    this.emailAlert = !this._loginService.isEmail(email);
  };

  public onSubmit = (values: any): void => {
    console.log(values);

    // * Reset Modal Fields
    this.email = "";
    this.password = "";
    this.disableSubmit = true;

    Swal.fire({
      position: "top",
      icon: "success",
      title: "You are Succesfully Log In!",
      showConfirmButton: false,
      timer: 1125,
    });

    (() => {
      setTimeout(() => {
        this._router.navigate(["/dashboard"]);
        this._closeModal();
      }, 1000);
    })();
  };

  public getValue = (f: any): void => {
    this.emptyFieldAlert = !this.email || !this.password ? true : false;
    this.disableSubmit =
      this.email && this.password && this._loginService.isEmail(this.email)
        ? false
        : true;
  };

  public resetLoginModal = (): void => {
    this.email = "";
    this.password = "";
    this.disableSubmit = true;
    this.emptyFieldAlert = false;
    this.emailAlert = false;
  };
}
