import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-model-select',
  standalone: true,
  imports: [],
  templateUrl: './model-select.component.html',
  styleUrl: './model-select.component.scss',
})
export class ModelSelectComponent implements OnInit, OnDestroy {

  models?: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.models = this.http.get('/models').subscribe(console.log);

  }

  ngOnDestroy() {
    this.models?.unsubscribe();
  }
}
