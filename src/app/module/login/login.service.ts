import { inject, Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../core/services/api-endpoints.service';
import { TokenServiceService } from '../../core/services/token-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface UserLoginData {
  email: string | null;
  password: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  router = inject(Router);
  constructor(
    private apiService: ApiEndpointsService,
    private tokenService: TokenServiceService,
    private toastService: ToastrService
  ) {}
  doUserLogin(userData: UserLoginData) {
    this.apiService.apiPost('user/login', userData).subscribe((data: any) => {
      console.log(data.token);
      this.tokenService.storeToken(data.token);
      this.toastService.success('Successfully Loggedin', 'logged in');
      this.router.navigate(['/gadget']);
    });
  }
}
