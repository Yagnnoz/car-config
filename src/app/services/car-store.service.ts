import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarStoreService {

  selectedCarModel$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedColor: BehaviorSubject<string> = new BehaviorSubject<string>('')

}
