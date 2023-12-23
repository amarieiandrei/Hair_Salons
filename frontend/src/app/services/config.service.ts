import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../components/register/components/register/types/user.interface";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  // * Fields
  private _authToken!: any;
  private _user!: object | null;

  constructor(private _http: HttpClient) {}

  public createUser = (user: User): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .post(`${environment.apiUrl}/api/users`, user, { headers: headers })
      .pipe(map((res) => res));
  };

  public authUser = (user: User): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .post(`${environment.apiUrl}/api/auth`, user, { headers: headers })
      .pipe(map((res) => res));
  };

  public getProfile = (): Observable<any> => {
    this.loadToken();

    if (this._authToken === null) {
      let observable = new Observable();
      return observable;
    }

    const headers = new HttpHeaders({
      "x-auth-token": this._authToken,
    });
    headers.append("Content-Type", "charset=UTF-8");

    return this._http.get<any>(`${environment.apiUrl}/api/profile`, {
      headers: headers,
    });
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
      .get(`${environment.apiUrl}/api/hairsalons`, { headers: headers })
      .pipe(map((res) => res));
  };
}
