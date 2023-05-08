import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HairsalonsService {
  constructor() {}

  public loadHairsalonsFromLocalStorage = (): Array<any> => {
    return JSON.parse(localStorage.getItem("hairsalons") || "{}");
  };

  public searchHairsalonsByName = (
    hairsalon: string,
    name: string
  ): boolean => {
    // * Remove spaces from beggining and finish
    while (name[0].localeCompare(" ") === 0 && name.length > 2) {
      name = name.slice(1);
    }
    while (name[name.length - 1].localeCompare(" ") === 0 && name.length > 2) {
      name = name.slice(0, name.length - 1);
    }

    if (name.length < 3) {
      return false;
    }

    hairsalon = hairsalon.toLocaleLowerCase();
    name = name.toLocaleLowerCase();

    if (hairsalon.includes(name)) {
      return true;
    }

    return false;
  };

  public searchHairsalonsByLocation = (
    hairsalonLocation: string,
    location: string
  ): boolean => {
    // * Remove spaces from beggining and finish
    while (location[0].localeCompare(" ") === 0 && location.length > 2) {
      location = location.slice(1);
    }
    while (
      location[location.length - 1].localeCompare(" ") === 0 &&
      location.length > 2
    ) {
      location = location.slice(0, location.length - 1);
    }

    if (location.length < 3) {
      return false;
    }

    hairsalonLocation = hairsalonLocation.toLocaleLowerCase();
    location = location.toLocaleLowerCase();

    const locationSplited = location.split(" ");

    if (locationSplited.length > 1) {
      for (let loc of locationSplited) {
        if (hairsalonLocation.includes(loc)) {
          return true;
        }
      }
    } else {
      if (hairsalonLocation.includes(location)) {
        return true;
      }
    }

    return false;
  };
}
