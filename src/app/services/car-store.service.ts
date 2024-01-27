import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { ModelSelection } from "../types/car-model.type";
import { ModelService } from "./model.service";
import { ConfigurationSelection } from "../types/car-options.type";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class CarStoreService {

  selectedCarModel$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedColor$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedConfigurationId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isYokeSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isTowSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  selectedModel$: Observable<ModelSelection> = new Observable<ModelSelection>();
  selectedConfiguration$: Observable<ConfigurationSelection> = new Observable<ConfigurationSelection>();

  totalCost$: Observable<number> = new Observable<number>()

  constructor(
    private readonly modelService: ModelService,
    private readonly configService: ConfigService,
  ) {
    this.totalCost$ = combineLatest([this.selectedConfiguration$, this.isYokeSelected$, this.isTowSelected$]).pipe(
      map(([config, yoke, tow]) => {
          let result = config.config.price;
          if (yoke) {
            result += 1000;
          }
          if (tow) {
            result += 1000;
          }
          return result;
        }
      ),
      tap(console.log),
    )
  }

  resetConfiguration() {
    this.selectedConfigurationId$.next(0);
  }

  saveModel(modelCode: string, colorCode: string, url: string): void {
    this.selectedModel$ = this.modelService.getFullModelConfiguration(modelCode, colorCode, url);
    this.resetConfiguration();
  }

  saveConfiguration(configId: number, towSelected: boolean, yokeSelected: boolean) {
    this.selectedConfiguration$ = this.configService.getFullConfiguration(this.selectedCarModel$.value, configId, yokeSelected, towSelected);
  }

}
