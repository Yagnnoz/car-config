import { Component, OnInit } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';
import { CarConfig, CarOptions } from '../../types/car-options.type';
import { Observable, switchMap } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { AsyncPipe, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-model-config',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './model-config.component.html',
  styleUrl: './model-config.component.scss',
})
export class ModelConfigComponent implements OnInit {

  availableConfiguration$: Observable<CarOptions>;
  selectedConfiguration$: Observable<CarConfig>;

  selectedConfigId: string = '';

  constructor(
    private readonly storeService: CarStoreService,
    private readonly configService: ConfigService,
  ) {
    this.availableConfiguration$ = this.configService.availableConfigurations$;
    this.selectedConfiguration$ = this.configService.selectedConfig$;
  }

  configurationChange(): void {
    const configIdAsNumber = +this.selectedConfigId;
    this.storeService.selectedConfigurationId$.next(configIdAsNumber);
  }

  ngOnInit() {
  }


}
