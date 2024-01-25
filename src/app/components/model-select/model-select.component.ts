import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarModel, ModelColor } from '../../types/car-model.type';
import { ModelService } from '../../services/model.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-model-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './model-select.component.html',
  styleUrl: './model-select.component.scss',
})
export class ModelSelectComponent implements OnInit, OnDestroy {

  models?: Observable<CarModel[]>;
  colors: ModelColor[] = [];

  selectedModel: CarModel = {} as CarModel;
  selectedColor?: ModelColor;

  constructor(
    private readonly modelService: ModelService,
  ) {
  }

  ngOnInit() {
    this.models = this.modelService.models$;
    // this.colors = this.modelService.carColors$;

  }

  modelChange(selectedModel: CarModel): void {
    // if (this.selectedModel) {
    //   this.modelService.getModelColors(this.selectedModel).pipe(
    //     take(1),
    //   ).subscribe();
    // }
    console.info(typeof selectedModel);
    this.colors = selectedModel.colors;
  }

  ngOnDestroy() {
  }
}
