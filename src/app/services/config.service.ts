import { Injectable } from '@angular/core';
import { CarConfig, CarOptions } from '../types/car-options.type';
import { map, NEVER, Observable, Subscription, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarStoreService } from "./car-store.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  availableConfigurations$!: Observable<CarOptions>;
  selectedConfig$!: Observable<CarConfig>;

  carModelSub: Subscription;

  constructor(
    private http: HttpClient,
    private storageService: CarStoreService
  ) {
    this.carModelSub = this.storageService.selectedCarModel$.subscribe(
      data => this.availableConfigurations$ = this.getConfigurationForCode(data));
    this.selectedConfig$ = this.storageService.selectedConfigurationId$.pipe(
      switchMap(configId => this.getSingleConfiguration(this.storageService.selectedCarModel$.value, configId)),
    )
  }


  getConfigurationForCode(code: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`/options/${code}`);
  }

  getSingleConfiguration(code: string, id: number): Observable<CarConfig> {
    if (code && id) {
      return this.http.get<CarOptions>(`/options/${code}`).pipe(
        map(options => options.configs),
        map(configs => {
          const firstMatchingValue = configs.find(config => config.id === +id);
          return firstMatchingValue ?? {} as CarConfig;
        }),
      )
    } else {
      return NEVER;
    }
  }
}
