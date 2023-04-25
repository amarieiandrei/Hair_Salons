import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor() {}

  public isEmail = (email: string): boolean => {
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email) ? true : false;
  };

  public verifPswLength(password: string): boolean {
    if (password.length < 6) {
      return false;
    }
    return true;
  }

  public verifPswUppercase(password: string): boolean {
    let pswSplit = password.split("");
    for (let i = 0; i < pswSplit.length; i += 1) {
      let charCode = pswSplit[i].charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        return true;
      }
    }
    return false;
  }

  public verifPswLowercase(password: string): boolean {
    let pswSplit = password.split("");
    for (let i = 0; i < pswSplit.length; i += 1) {
      let charCode = pswSplit[i].charCodeAt(0);
      if (charCode >= 97 && charCode <= 122) {
        return true;
      }
    }
    return false;
  }

  public verifPswNumber(password: string) {
    let pswSplit = password.split("");
    for (let i = 0; i < pswSplit.length; i += 1) {
      let charCode = pswSplit[i].charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        return true;
      }
    }
    return false;
  }

  public verifPswSymbol(password: string) {
    const specialChars = "[`!@#$%^&*()_+-=[]{};':\"\\|,.<>/?~]\\";
    let pswSplit = password.split("");
    for (let i = 0; i < pswSplit.length; i += 1) {
      if (specialChars.indexOf(pswSplit[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  public verifEmptyFieldsAlert(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): boolean {
    let count = 0;

    if (name !== undefined) {
      count += 1;
    }
    if (email !== undefined) {
      count += 1;
    }
    if (password !== undefined) {
      count += 1;
    }
    if (confirmPassword !== undefined) {
      count += 1;
    }

    if (count === 3) {
      return true;
    }
    return false;
  }

  public verifPswSimilarity = (
    password: string,
    confirmPassword: string
  ): boolean => {
    if (password === undefined && confirmPassword === undefined) {
      return true;
    } else if (password === undefined || confirmPassword === undefined) {
      return false;
    } else {
      if (password.localeCompare(confirmPassword) === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
}
