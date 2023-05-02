import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../components/register/components/register/types/user.interface";
import { map } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private _usersUrl = "http://localhost:5000/api/users";
  private _authUrl = "http://localhost:5000/api/auth";

  constructor(private _http: HttpClient) {}

  createUser = (user: User): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .post(this._usersUrl, user, { headers: headers })
      .pipe(map((res) => res));
  };

  authUser = (user: User): any => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });

    return this._http
      .post(this._authUrl, user, { headers: headers })
      .pipe(map((res) => res));
  };
}
