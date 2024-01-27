import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';
import { CarConfig, CarOptions } from '../../types/car-options.type';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ValidButtonsService } from "../../services/valid-buttons.service";

@Component({
  selector: 'app-model-config',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './model-config.component.html',
  styleUrl: './model-config.component.scss',
})
export class ModelConfigComponent implements OnDestroy {

  availableConfiguration$: Observable<CarOptions> = new Observable<CarOptions>();
  selectedConfiguration$: Observable<CarConfig> = new Observable<CarConfig>();

  carModelSub: Subscription;

  selectedConfigId: string = '';
  isTowSelected = false;
  isYokeSelected = false;

  carModelCode: string;

  constructor(
    private readonly storeService: CarStoreService,
    private readonly configService: ConfigService,
    private readonly validButtonService: ValidButtonsService,
  ) {
    this.carModelCode = this.storeService.selectedCarModel$.value;

    this.carModelSub = this.storeService.selectedCarModel$.subscribe(
      data => this.availableConfiguration$ = this.configService.getConfigurationForCode(data)
    );

    this.selectedConfiguration$ = this.storeService.selectedConfigurationId$.pipe(
      switchMap(configId => this.configService.getSingleConfiguration(this.carModelCode, configId))
    );
  }

  configurationChange(): void {
    if (this.selectedConfigId) {
      const configIdAsNumber = +this.selectedConfigId;
      this.storeService.selectedConfigurationId$.next(configIdAsNumber);
      this.storeService.saveConfiguration(configIdAsNumber, this.isTowSelected, this.isYokeSelected);
      this.validButtonService.step3Active$.next(true);
    } else {
      this.validButtonService.step3Active$.next(false);
    }
  }

  towSelectionChange() {
    this.storeService.isTowSelected$.next(this.isTowSelected);
    this.configurationChange();
  }

  yokeSelectionChange() {
    this.storeService.isYokeSelected$.next(this.isYokeSelected);
    this.configurationChange();
  }

  ngOnDestroy() {
    this.carModelSub.unsubscribe();
  }


}
