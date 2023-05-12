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

  public searchHairsalonsByProgram = (
    hairsalonProgram: any,
    day: string,
    hours: string
  ): any => {
    if (day.localeCompare("") !== 0 && day.localeCompare("Any Date") !== 0) {
      day = day.toLocaleLowerCase();

      for (let key in hairsalonProgram) {
        if (
          hairsalonProgram[key].localeCompare("Closed") !== 0 &&
          key.localeCompare(day) === 0
        ) {
          const program: string = hairsalonProgram[key];
          const splitedProgram = program.split("-");

          let open = splitedProgram[0].slice(0, splitedProgram[0].length - 1);
          let close = splitedProgram[1].slice(1);

          let splitedHours = hours.split(":");
          let splitedOpen = open.split(":");
          let splitedClose = close.split(":");

          let hoursHour = parseInt(splitedHours[0]);
          let hoursMinutes = parseInt(splitedHours[1]);

          let openHour = parseInt(splitedOpen[0]);
          let openMinutes = parseInt(splitedOpen[1]);

          let closeHour = parseInt(splitedClose[0]);
          let closeMinutes = parseInt(splitedClose[1]);

          if (openHour < hoursHour && hoursHour < closeHour) {
            return true;
          } else if (
            openHour < hoursHour &&
            hoursHour === closeHour &&
            hoursMinutes < closeMinutes
          ) {
            return true;
          } else if (openHour === hoursHour && openMinutes <= hoursMinutes) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      day = day.toLocaleLowerCase();

      for (let key in hairsalonProgram) {
        if (hairsalonProgram[key].localeCompare("Closed") !== 0) {
          const program: string = hairsalonProgram[key];
          const splitedProgram = program.split("-");

          let open = splitedProgram[0].slice(0, splitedProgram[0].length - 1);
          let close = splitedProgram[1].slice(1);

          let splitedHours = hours.split(":");
          let splitedOpen = open.split(":");
          let splitedClose = close.split(":");

          let hoursHour = parseInt(splitedHours[0]);
          let hoursMinutes = parseInt(splitedHours[1]);

          let openHour = parseInt(splitedOpen[0]);
          let openMinutes = parseInt(splitedOpen[1]);

          let closeHour = parseInt(splitedClose[0]);
          let closeMinutes = parseInt(splitedClose[1]);

          if (openHour < hoursHour && hoursHour < closeHour) {
            return true;
          } else if (
            openHour < hoursHour &&
            hoursHour === closeHour &&
            hoursMinutes < closeMinutes
          ) {
            return true;
          } else if (openHour === hoursHour && openMinutes <= hoursMinutes) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  };
}
