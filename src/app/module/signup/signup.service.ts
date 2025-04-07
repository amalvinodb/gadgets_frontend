import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private apiService: ApiEndpointsService) {}
  doSignUp(data: any) {
    return this.apiService.apiPost('user/signup', data);
  }
}
