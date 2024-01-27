import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, filter, map, Observable, of, reduce, take, tap } from 'rxjs';
import { CarModel, ModelColor } from '../types/car-model.type';
import { CarOptions } from '../types/car-options.type';

@Injectable({
  providedIn: 'root',
})
export class ModelService {

  models$?: Observable<CarModel[]>;

  constructor(private http: HttpClient) {
    this.models$ = this.http.get<CarModel[]>('/models');
  }

  getModelColors(code: string): Observable<ModelColor[]> {
    return this.http.get<CarModel[]>('/models').pipe(
      map(models => {
          const model = models.find(model => model.code === code);
        console.log('found model: ', model);
          return model ? model.colors : [] as ModelColor[];
        }),
    );
  }

  getOptionsForCarModel(code: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`/options/${code}`).pipe(
      tap(console.log),
    );
  }
}
