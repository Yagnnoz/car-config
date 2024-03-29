import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
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
  imageUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedConfigurationId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isYokeSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isTowSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  selectedModel$: ReplaySubject<ModelSelection> = new ReplaySubject<ModelSelection>(1);
  selectedConfiguration$: ReplaySubject<ConfigurationSelection> = new ReplaySubject<ConfigurationSelection>(1);

  step2Active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  step3Active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly modelService: ModelService,
    private readonly configService: ConfigService,
  ) {

  }

  resetConfiguration() {
    this.selectedConfigurationId$.next(0);
    this.selectedConfiguration$.next({} as ConfigurationSelection);
    this.step3Active$.next(false);
    this.isYokeSelected$.next(false);
    this.isTowSelected$.next(false);
  }

  saveModel(modelCode: string, colorCode: string, url: string): void {
    this.imageUrl$.next(url);
    this.modelService.getFullModelConfiguration(modelCode, colorCode, url).pipe(
      take(1),
    ).subscribe(data => this.selectedModel$.next(data))
    this.resetConfiguration();
  }

  saveConfiguration(configId: number, towSelected: boolean, yokeSelected: boolean) {
    this.configService.getFullConfiguration(this.selectedCarModel$.value, configId, yokeSelected, towSelected).pipe(
      take(1),
    ).subscribe(data => this.selectedConfiguration$.next(data));
  }

}
