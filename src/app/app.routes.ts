import { Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { SignupComponent } from './module/signup/signup.component';
import { gadgetRoutes } from './module/gadget/gadget.routes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'gadget',
    loadChildren: () =>
      import('./module/gadget/gadget.routes').then((m) => m.gadgetRoutes),
  },
];
