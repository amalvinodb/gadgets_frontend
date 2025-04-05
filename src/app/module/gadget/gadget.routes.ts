import { Routes } from '@angular/router';
import { ListAllComponent } from './list-all/list-all.component';
import { GadgetComponent } from './gadget.component';
import { ListOneComponent } from './list-one/list-one.component';

export const gadgetRoutes: Routes = [
  {
    path: '',
    component: GadgetComponent,
    children: [
      { path: '', component: ListAllComponent },
      { path: ':id', component: ListOneComponent },
    ],
  },
];
