import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log the error to the console
      console.error('HTTP Error:', error);

      // Display a user-friendly message (e.g., using an alert or Snackbar)
      toastr.error(
        `An error occurred: ${error.status} - ${error.error.message}`
      );

      // Optionally, handle specific status codes
      if (error.status === 401) {
        console.error('Unauthorized access - redirecting to login.');
      } else if (error.status === 404) {
        console.error('Resource not found.');
      }

      // Rethrow the error so it can be handled further downstream if needed
      return throwError(() => new Error(error.message));
    })
  );
};
