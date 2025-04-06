import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private apiService: ApiEndpointsService) {}
  addGadget(data: any) {
    return this.apiService.apiPost('gadget/add', data);
  }
  fetchGadget(id: string) {
    return this.apiService.apiGet('gadget/' + id);
  }
  updateGadget(id: string, data: any) {
    return this.apiService.apiPut('gadget/update/' + id, data);
  }
}
