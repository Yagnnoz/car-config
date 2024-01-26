import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarModel, ModelColor } from '../../types/car-model.type';
import { ModelService } from '../../services/model.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidButtonsService } from '../../services/valid-buttons.service';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-model-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './model-select.component.html',
  styleUrl: './model-select.component.scss',
})
export class ModelSelectComponent implements OnInit {

  allModels$?: Observable<CarModel[]>;

  availableColors$!: Observable<ModelColor[]>;

  url: string = '';

  selectedModel: string = '';
  selectedColor: string = '';

  constructor(
    private readonly modelService: ModelService,
    private readonly buttonActiveService: ValidButtonsService,
    private readonly storeService: CarStoreService,
  ) {
  }

  ngOnInit() {
    this.allModels$ = this.modelService.models$;
    this.availableColors$ = this.storeService.selectedCarModel$.pipe(
      switchMap(modelCode => this.modelService.getModelColors(modelCode))
    )
  }

  colorChange() {
    if (this.selectedModel && this.selectedColor) {
      this.url = `https://interstate21.com/tesla-app/images/${this.selectedModel}/${this.selectedColor}.jpg`;
      this.buttonActiveService.step2Active$.next(true);
    } else {
      this.url = '';
      this.buttonActiveService.step2Active$.next(false);
    }
  }

  modelChange(selectedModel: string): void {
    this.storeService.selectedCarModel$.next(selectedModel);
    this.colorChange();
  }

}
