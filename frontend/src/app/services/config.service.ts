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
  private _profileUrl = "http://localhost:5000/api/profile";
  private _hairsalonsUrl = "http://localhost:5000/api/hairsalons";

  // * Fields
  private _authToken!: any;
  private _user!: object | null;

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

  public getProfile = (): any => {
    this.loadToken();

    const headers = new HttpHeaders({
      "x-auth-token": this._authToken,
    });
    headers.append("Content-Type", "charset=UTF-8");

    return this._http
      .get(this._profileUrl, { headers: headers })
      .pipe(map((res) => res));
  };

  public storeUserData = (token: string, user: object): void => {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    this._authToken = token;
    this._user = user;
  };

  public loadToken = (): void => {
    const token = localStorage.getItem("id_token");
    this._authToken = token;
  };

  public logout = (): void => {
    this._authToken = null;
    this._user = null;
    localStorage.clear();
  };

  public getHairsalons = (): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .get(this._hairsalonsUrl, { headers: headers })
      .pipe(map((res) => res));
  };
}
