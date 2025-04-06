import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class ListAllApiService {
  constructor(private apiService: ApiEndpointsService) {}
  getAllGadgetDetails(page: any) {
    return this.apiService.apiGet('gadget?page=' + page);
  }
  deleteGadget(id: any) {
    return this.apiService.apiDelete('gadget/delete/' + id);
  }
  bulkDeleteGadget(itemList: any[]) {
    return this.apiService.apiPost('gadget/delete', { itemList });
  }
}
