import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidButtonsService {

  step2Active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  step3Active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
