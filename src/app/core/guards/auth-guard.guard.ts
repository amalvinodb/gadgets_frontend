import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Replace 'token' with your actual key
  if (token) {
    return true; // Allow access if the token exists
  } else {
    // Redirect to login page if the token does not exist
    router.navigate(['/login']); // Adjust '/login' to match your login route
    return false; // Adjust '/login' to your login route
  }
};
