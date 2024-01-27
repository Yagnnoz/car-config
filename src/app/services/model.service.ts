import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { CarModel, ModelColor, ModelSelection } from '../types/car-model.type';
import { CarOptions } from '../types/car-options.type';

@Injectable({
  providedIn: 'root',
})
export class ModelService {

  availableModels$?: Observable<CarModel[]>;

  constructor(private http: HttpClient) {
    this.availableModels$ = this.http.get<CarModel[]>('/models');
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

  getFullModelConfiguration(modelCode: string, colorCode: string, imgUrl: string): Observable<ModelSelection> {
    return this.http.get<CarModel[]>('/models').pipe(
      map(models => {
        // only need the first match, there should be no others
        const filteredModel = models.filter(model => model.code === modelCode)[0];
        const filteredColor = filteredModel.colors.filter(color => color.code === colorCode)[0];
        const result: ModelSelection = {
          code: filteredModel.code,
          description: filteredModel.description,
          color: filteredColor,
          imgUrl: imgUrl,
        }
        return result;
      })
    )
  }


  getOptionsForCarModel(code: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`/options/${code}`).pipe(
      tap(console.log),
    );
  }
}
