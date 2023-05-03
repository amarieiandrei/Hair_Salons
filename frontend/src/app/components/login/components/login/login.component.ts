import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { User } from "src/app/components/register/components/register/types/user.interface";
import { ConfigService } from "src/app/services/config.service";
import { LoginService } from "src/app/services/login.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements AfterViewInit {
  // * Fields
  public isAccount: boolean = false;

  public pswType: boolean = false;
  public pswText: string = "SHOW";

  public emailAlert: boolean = false;

  public inputEmail!: string;
  public inputPassword!: string;

  public disableSubmit: boolean = true;

  // * Modal
  public modalRef?: BsModalRef;
  @ViewChild("loginModal") loginModal!: TemplateRef<any>;

  constructor(
    private _router: Router,
    private _modalService: BsModalService,
    private _loginService: LoginService,
    private _configService: ConfigService
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
    this.isAccount = false;
  };

  verifPassword = (): void => {
    this.isAccount = false;
  };

  public onSubmit = (values: any): void => {
    const user: User = values;

    // * Auth User
    this._configService.authUser(user).subscribe((data: any) => {
      if (data.success) {
        console.log("You are now logged in and can edit dashboard");
        console.log(data);

        // * Store User Data to LocalStorage
        this._configService.storeUserData(data.token, data.user);

        // * Reset Modal Fields
        this.inputEmail = "";
        this.inputPassword = "";
        this.disableSubmit = true;

        Swal.fire({
          position: "top",
          icon: "success",
          title: "You are now Logged in!",
          showConfirmButton: false,
          timer: 1125,
        });

        (() => {
          setTimeout(() => {
            this._router.navigate(["/dashboard"]);
            this._closeModal();
          }, 1000);
        })();
      } else {
        // console.log(data.msg);
        this.isAccount = true;
        this.disableSubmit = true;
      }
    });
  };

  public getValue = (f: any): void => {
    this.disableSubmit =
      this.inputEmail &&
      this.inputPassword &&
      this._loginService.isEmail(this.inputEmail)
        ? false
        : true;
  };

  public resetLoginModal = (): void => {
    this.inputEmail = "";
    this.inputPassword = "";
    this.disableSubmit = true;
    this.emailAlert = false;
  };

  public tooglePsw = (): void => {
    this.pswType = !this.pswType;

    this.pswText.localeCompare("SHOW") === 0
      ? (this.pswText = "HIDE")
      : (this.pswText = "SHOW");
  };
}
