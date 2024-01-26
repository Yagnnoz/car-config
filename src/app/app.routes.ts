import { Routes } from '@angular/router';
import { ModelSelectComponent } from "./components/model-select/model-select.component";
import { ModelConfigComponent } from './components/model-config/model-config.component';

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
    path: '**',
    redirectTo: '/model'
  },
];
