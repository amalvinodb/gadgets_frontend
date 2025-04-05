import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken') || ''; // Fetch token from storage

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`, // Add Bearer Token to headers
    },
  });
  return next(clonedRequest);
};
