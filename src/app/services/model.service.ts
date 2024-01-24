import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { filter, map, Observable, take, tap } from "rxjs";
import { CarModel, ModelColor } from "../types/car-model.type";

@Injectable({
  providedIn: 'root'
})
export class ModelService {


  models$?: Observable<CarModel[]>

  carColors$?: ModelColor[];

  constructor(private http: HttpClient) {

    this.models$ = this.http.get<CarModel[]>('/models');

  }

  getModelColors(code: string) {
    this.http.get<CarModel[]>('/models').pipe(
      // map(value => value.)
      tap(console.log),
      filter(model => model.code === code),
      map(model => model.colors),
      tap(console.log),
      take(1)
    ).subscribe();
  }
}
