import { inject } from "@angular/core";
import { ConfigService } from "../services/config.service";
import { Observable, map } from "rxjs";
import { Router } from "@angular/router";

export const authGuard = (): Observable<boolean> => {
  const configService = inject(ConfigService);
  const router = inject(Router);

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
