import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { CarModel, ModelColor } from "../../types/car-model.type";
import { ModelService } from "../../services/model.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModelSelectCustomForm } from "../../forms/model-select.form";
import { ModelSelectService } from "../../services/model-select.service";

@Component({
  selector: 'app-model-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './model-select.component.html',
  styleUrl: './model-select.component.scss',
})
export class ModelSelectComponent implements OnInit, OnDestroy {

  models?: Observable<CarModel[]>;
  colors?: Observable<ModelColor[]>;

  form!: ModelSelectCustomForm;

  constructor(
    private readonly modelService: ModelService,
    private readonly modelFormService: ModelSelectService,
  ) {
  }

  ngOnInit() {
    this.form = this.modelFormService.getForm();
    this.models = this.modelService.models$;

    this.modelFormService.getLatestValueChanges().subscribe(value => {
      this.modelService.getModelColors(value.model);
    })

  }

  refreshColors() {
  }

  ngOnDestroy() {
  }
}
