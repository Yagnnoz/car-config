import { Routes } from '@angular/router';
import { ModelSelectComponent } from "./components/model-select/model-select.component";

export const routes: Routes = [
  {
    path: 'model',
    component: ModelSelectComponent,
  },
  {
    path: '**',
    redirectTo: '/model'
  },
];
