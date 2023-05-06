import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loadingSubject = new Subject<boolean>();
  public loadingAction$ = this.loadingSubject.asObservable();

  constructor() {}

  public showLoader = (): void => {
    this.loadingSubject.next(true);
  };

  public hideLoader = (): void => {
    this.loadingSubject.next(false);
  };
}
