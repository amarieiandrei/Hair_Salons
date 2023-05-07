import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HairsalonsService {
  constructor() {}

  public loadHairsalonsFromLocalStorage = (): Array<any> => {
    return JSON.parse(localStorage.getItem("hairsalons") || "{}");
  };

  public extractCityFromHairsalonLocation = (hairsalon: any): string => {
    const hairsalonLocation = hairsalon.location;
    const hairsalonLocationSplited = hairsalonLocation.split(",");
    let city = hairsalonLocationSplited[hairsalonLocationSplited.length - 1];
    city = city.slice(1);
    return city;
  };
}
