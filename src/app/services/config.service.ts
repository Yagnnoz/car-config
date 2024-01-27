import { Injectable } from '@angular/core';
import { CarConfig, CarOptions, ConfigurationSelection } from '../types/car-options.type';
import { combineLatest, map, NEVER, Observable, Subscription, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarStoreService } from "./car-store.service";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
  ) {}

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

  getFullConfiguration(modelCode: string,
    configId: number,
    yoke: boolean,
    tow: boolean
  ): Observable<ConfigurationSelection> {
    return this.http.get<CarOptions>(`/options/${modelCode}`).pipe(
      map(allOptions => {
        const selectedConfiguration = allOptions.configs.filter(config => config.id === configId)[0];
        const result: ConfigurationSelection = {
          config: selectedConfiguration,
          yokeActive: yoke,
          towHitchActive: tow,
        };
        return result;
      })
    )

  }
}
