import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { CarModel } from "../types/car-model.type";

@Component({
  selector: 'app-model-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-select.component.html',
  styleUrl: './model-select.component.scss',
})
export class ModelSelectComponent implements OnInit, OnDestroy {

  models?: Observable<CarModel[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.models = this.http.get<CarModel[]>('/models');

  }

  ngOnDestroy() {
  }
}
