import { Routes } from '@angular/router';
import { ModelSelectComponent } from "./components/model-select/model-select.component";
import { ModelConfigComponent } from './components/model-config/model-config.component';
import { SummaryComponent } from "./components/summary/summary.component";

export const routes: Routes = [
  {
    path: 'model',
    component: ModelSelectComponent,
  },
  {
    path: 'config',
    component: ModelConfigComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: '**',
    redirectTo: '/model'
  },
];
