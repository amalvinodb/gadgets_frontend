import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private apiService: ApiEndpointsService) {}
}
