import { Component, OnDestroy } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';
import { CarConfig, CarOptions } from '../../types/car-options.type';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

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

  carModelCode: string = '';

  constructor(
    private readonly storeService: CarStoreService,
    private readonly configService: ConfigService,
  ) {
    this.loadValuesFromStorage();
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
      this.storeService.step3Active$.next(true);
    } else {
      this.storeService.step3Active$.next(false);
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

  loadValuesFromStorage(): void {
    this.carModelCode = this.storeService.selectedCarModel$.value;
    this.selectedConfigId = this.storeService.selectedConfigurationId$.value.toString();
    this.isYokeSelected = this.storeService.isYokeSelected$.value;
    this.isTowSelected = this.storeService.isTowSelected$.value;
  }

  ngOnDestroy() {
    this.carModelSub.unsubscribe();
  }
}
