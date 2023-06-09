import { Component, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { RegisterService } from "src/app/services/register.service";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { User } from "./types/user.interface";
import { ConfigService } from "src/app/services/config.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  // * Icons
  public faCheck = faCheck;

  // * Fields
  public isEmailUsed: boolean = false;

  public disablePassword: boolean = false;
  public passwordEntered: boolean = false;

  public confirmPswType: boolean = false;
  public pswType: boolean = false;
  public confirmPswText: string = "SHOW";
  public pswText: string = "SHOW";

  public isPasswordsEquals: boolean = false;
  public isPswRules: boolean = false;

  public isUppercase: boolean = false;
  public isLowercase: boolean = false;
  public isNumber: boolean = false;
  public isSpecialCharacter: boolean = false;
  public isMinimumLength: boolean = false;

  public nameAlert: boolean = false;
  public emailAlert: boolean = false;

  public inputName!: string;
  public inputEmail!: string;
  public inputPassword!: string;
  public inputConfirmPassword!: string;

  public disableSubmit: boolean = true;

  // public inputName: string = "test";
  // public inputEmail: string = "test@test.ro";
  // public inputPassword: string = "Andrei123!";
  // public inputConfirmPassword: string = "Andrei123!";

  // public disableSubmit: boolean = false;

  // * Modal
  public modalRef?: BsModalRef;

  constructor(
    private _modalService: BsModalService,
    private _registerService: RegisterService,
    private _router: Router,
    private _configService: ConfigService
  ) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  public verifName = (name: string): void => {
    this.nameAlert = !this._registerService.isName(name);
  };

  public verifEmail = (email: string): void => {
    this.emailAlert = !this._registerService.isEmail(email);
    this.isEmailUsed = false;
  };

  public tooglePsw = (): void => {
    // * Little Bug
    this.pswType = !this.pswType;

    this.pswText.localeCompare("SHOW") === 0
      ? (this.pswText = "HIDE")
      : (this.pswText = "SHOW");
  };

  public toogleConfirmPsw = (): void => {
    this.confirmPswType = !this.confirmPswType;

    this.confirmPswText.localeCompare("SHOW") === 0
      ? (this.confirmPswText = "HIDE")
      : (this.confirmPswText = "SHOW");
  };

  public showPswRules = (): void => {
    if (this.passwordEntered === false) {
      this.isPswRules = true;
      this.passwordEntered = true;
    }
  };

  public quitPswRules = (): void => {
    if (
      this.isUppercase &&
      this.isLowercase &&
      this.isNumber &&
      this.isMinimumLength &&
      this.isSpecialCharacter
    ) {
      this.disablePassword = true;
      this.isPswRules = false;
    }
  };

  public verifPswRules = (): void => {
    this.isUppercase = this._registerService.verifPswUppercase(
      this.inputPassword
    );
    this.isLowercase = this._registerService.verifPswLowercase(
      this.inputPassword
    );
    this.isNumber = this._registerService.verifPswNumber(this.inputPassword);
    this.isSpecialCharacter = this._registerService.verifPswSymbol(
      this.inputPassword
    );
    this.isMinimumLength = this._registerService.verifPswLength(
      this.inputPassword
    );
  };

  public getValue = (f: any): void => {
    // console.log(f);

    if (this.passwordEntered) {
      this.quitPswRules();
    }

    this.disableSubmit =
      this.inputName &&
      this.inputEmail &&
      this.inputPassword &&
      this.inputConfirmPassword &&
      this._registerService.isEmail(this.inputEmail) &&
      this._registerService.isName(this.inputName) &&
      this.isLowercase &&
      this.isUppercase &&
      this.isNumber &&
      this.isSpecialCharacter &&
      this.isMinimumLength &&
      this.inputPassword.localeCompare(this.inputConfirmPassword) === 0
        ? false
        : true;
  };

  public onSubmit = (values: any): void => {
    const user: User = values;

    // * Register User
    this._configService.createUser(user).subscribe((data: any) => {
      // console.log(data);

      if (data.success !== undefined && !data.success) {
        // console.log(data.msg);
        this.isEmailUsed = true;
        this.disableSubmit = true;
      } else {
        // console.log("You are now registered and can log in");

        // * Reset Modal Fields
        this.inputName = "";
        this.inputEmail = "";
        this.inputPassword = "";
        this.inputConfirmPassword = "";
        this.disableSubmit = true;
        Swal.fire({
          position: "top",
          icon: "success",
          title: "You are Succesfully Register!",
          showConfirmButton: false,
          timer: 1125,
        });
        (() => {
          setTimeout(() => {
            this._router.navigate(["/login"]);
          }, 1000);
        })();
      }
    });
  };

  public handleIsPasswordsEquals = (): void => {
    this.isPasswordsEquals = !this._registerService.verifPswSimilarity(
      this.inputPassword,
      this.inputConfirmPassword
    );
  };

  public handleReTypePassword = (): void => {
    this.inputPassword = "";
    this.isUppercase = false;
    this.isLowercase = false;
    this.isNumber = false;
    this.isMinimumLength = false;
    this.isSpecialCharacter = false;
    this.isPswRules = false;
    this.disablePassword = false;
    this.passwordEntered = false;
    this.disableSubmit = true;
  };
}
