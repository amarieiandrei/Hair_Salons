import { inject } from "@angular/core";
import { ConfigService } from "../services/config.service";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Router } from "@angular/router";

export const authGuard = (): Observable<boolean> => {
  const configService = inject(ConfigService);
  const router = inject(Router);

  let user$ = new BehaviorSubject([]);

  configService.getProfile().subscribe((profile) => {
    user$.next(profile.user);
  });

  setTimeout((): any => {
    if (user$.getValue().length === 0) {
      router.navigate(["login"]);
      return false;
    }
  }, 75);

  return configService.getProfile().pipe(
    map((profile) => {
      if (!profile.user) {
        router.navigate(["login"]);
        return false;
      }
      return true;
    })
  );
};
