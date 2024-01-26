import { Component, OnInit } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';
import { CarConfig } from '../../types/car-options.type';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-model-config',
  standalone: true,
  imports: [],
  templateUrl: './model-config.component.html',
  styleUrl: './model-config.component.scss',
})
export class ModelConfigComponent implements OnInit{


  availableConfiguration$!: Observable<CarConfig>;

  constructor(
    private readonly storeService: CarStoreService,
    private readonly configService: ConfigService,
  ) {
  }

  ngOnInit() {

  }

}
