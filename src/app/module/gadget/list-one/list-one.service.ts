import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class ListOneService {
  constructor(private apiService: ApiEndpointsService) {}
  fetchOneData(id: string | null) {
    return this.apiService.apiGet('gadget/' + id);
  }
  decryptSecret(key: string | null, id: string | null) {
    return this.apiService.apiPost('gadget/secret', { id, key });
  }
}
