import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../components/register/components/register/types/user.interface";
import { map } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ConfigService {
  // * Apis
  private _usersUrl = "http://localhost:5000/api/users";
  private _authUrl = "http://localhost:5000/api/auth";

  // * Fields
  private _authToken!: string;
  private _user!: object;

  constructor(private _http: HttpClient) {}

  public createUser = (user: User): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .post(this._usersUrl, user, { headers: headers })
      .pipe(map((res) => res));
  };

  public authUser = (user: User): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .post(this._authUrl, user, { headers: headers })
      .pipe(map((res) => res));
  };

  public storeUserData = (token: string, user: object): void => {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this._authToken = token;
    this._user = user;
  };

  public logout = (): void => {
    this._authToken = "";
    this._user = {};
    localStorage.clear();
  };
}
