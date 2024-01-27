import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { RouterLink } from "@angular/router";
import { CarStoreService } from "../../services/car-store.service";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  step2Active$: BehaviorSubject<boolean>;
  step3Active$: BehaviorSubject<boolean>;


  constructor(
    private storageService: CarStoreService,
  ) {
    this.step2Active$ = this.storageService.step2Active$;
    this.step3Active$ = this.storageService.step3Active$;

  }

}
