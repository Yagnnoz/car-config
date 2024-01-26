import { Injectable } from '@angular/core';
import { CarConfig } from '../types/car-options.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
  ) { }


  getConfigurationForCode(code: string): Observable<CarConfig> {
    return this.http.get<CarConfig>(`/options/${code}`);
  }
}
