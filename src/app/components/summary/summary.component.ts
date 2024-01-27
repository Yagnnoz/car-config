import { Component } from '@angular/core';
import { combineLatest, map, Observable } from "rxjs";
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

    this.totalCost$ = combineLatest([this.selectedModel$, this.selectedConfiguration$]).pipe(
      map(([model, config]) => {
        return config.config.price +
          model.color.price +
          (config.yokeActive ? 1000 : 0) +
          (config.towHitchActive ? 1000 : 0);
      })
    )

  }
}
