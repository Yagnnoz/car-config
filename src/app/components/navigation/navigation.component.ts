import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from "@angular/common";
import { ValidButtonsService } from "../../services/valid-buttons.service";
import { BehaviorSubject } from "rxjs";
import { RouterLink } from "@angular/router";

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
    private buttonValidService: ValidButtonsService
  ) {
    this.step2Active$ = this.buttonValidService.step2Active$;
    this.step3Active$ = this.buttonValidService.step3Active$;

  }

}
