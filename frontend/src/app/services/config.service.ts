import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../components/register/components/register/types/user.interface";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private _usersUrl = "http://localhost:5000/api/users";

  constructor(private _http: HttpClient) {}

  createUser = (user: User): void => {
    const headers = new HttpHeaders({
      myHeader: "maliakademy",
    });

    this._http
      .post<User>(this._usersUrl, user, { headers: headers })
      .subscribe((res) => {
        console.log(res);
      });
  };
}
