import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, filter, map, Observable, of, reduce, take, tap } from 'rxjs';
import { CarModel, ModelColor } from '../types/car-model.type';

@Injectable({
  providedIn: 'root',
})
export class ModelService {


  models$?: Observable<CarModel[]>;

  constructor(private http: HttpClient) {

    this.models$ = this.http.get<CarModel[]>('/models');
  }

  getModelColors(code: string): Observable<ModelColor[]> {
    console.log('code is: ', code);
    return this.http.get<CarModel[]>('/models').pipe(
      map(models => {
          const model = models.find(model => model.code === code);
        console.log('found model: ', model);
          return model ? model.colors : [] as ModelColor[];
        }),
    );
  }
}
