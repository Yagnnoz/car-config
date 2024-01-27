import { Routes } from '@angular/router';
import { ModelSelectComponent } from "./components/model-select/model-select.component";
import { ModelConfigComponent } from './components/model-config/model-config.component';
import { SummaryComponent } from "./components/summary/summary.component";
import { getStepAllowedGuardFn } from "./components/guards/canActivate.factory";

export const routes: Routes = [
  {
    path: 'model',
    component: ModelSelectComponent,
  },
  {
    path: 'config',
    component: ModelConfigComponent,
    canActivate: [getStepAllowedGuardFn(2)],
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [getStepAllowedGuardFn(3)],
  },
  {
    path: '**',
    redirectTo: '/model'
  },
];
