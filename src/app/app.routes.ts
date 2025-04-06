import { Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { SignupComponent } from './module/signup/signup.component';
import { NotfoundComponent } from './core/errors/notfound/notfound.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'gadget', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'gadget',
    loadChildren: () =>
      import('./module/gadget/gadget.routes').then((m) => m.gadgetRoutes),
    canActivate: [authGuardGuard],
  },
  {
    path: '**',
    component: NotfoundComponent, // Fallback to /gadget for unknown routes
  },
];
