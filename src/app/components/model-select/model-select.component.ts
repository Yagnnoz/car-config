import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, tap } from 'rxjs';
import { CarModel } from '../../types/model.type';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-select',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './model-select.component.html',
  styleUrl: './model-select.component.scss',
})
export class ModelSelectComponent implements OnInit, OnDestroy {

  models?: Observable<CarModel[]>;
  modelSub?: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.models = this.http.get<CarModel[]>('/models');
    this.modelSub = this.models.pipe(
      tap(console.log)
    ).subscribe()
  }

  ngOnDestroy() {
    this.modelSub?.unsubscribe();
  }
}
