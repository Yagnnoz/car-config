import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarStoreService {

  selectedCarModel$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedColor$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedConfigurationId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.selectedConfigurationId$.subscribe(v => console.log('store service. type of selectedConfigId: ', typeof v)
    );
  }

}
