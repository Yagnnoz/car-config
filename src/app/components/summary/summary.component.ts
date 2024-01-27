import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { ModelSelection } from "../../types/car-model.type";
import { CarStoreService } from "../../services/car-store.service";
import { CommonModule } from "@angular/common";
import { ConfigurationSelection } from "../../types/car-options.type";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  selectedModel$: Observable<ModelSelection>;
  selectedConfiguration$: Observable<ConfigurationSelection>;
  totalCost$: Observable<number>;

  constructor(
    private readonly storeService: CarStoreService,
  ) {
    this.selectedModel$ = this.storeService.selectedModel$;
    this.selectedConfiguration$ = this.storeService.selectedConfiguration$;
    this.totalCost$ = this.storeService.totalCost$;
  }
}
