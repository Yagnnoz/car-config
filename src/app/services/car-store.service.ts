import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarStoreService {

  selectedCarModel$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedColor$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedConfigurationId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.selectedColor$.subscribe(console.log);
  }

  resetConfiguration() {
    this.selectedConfigurationId$.next(0);
  }

}
