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
  addQuantity(data: any[]) {
    const finalupdate: { id: string; item_quantity: number }[] = [];
    data.forEach((item) => {
      const temp = {
        id: item.id,
        item_quantity: item.item_quantity + 1,
      };
      finalupdate.push(temp);
    });
    console.log(finalupdate, data);
    return this.apiService.apiPut('gadget/bulk', finalupdate);
  }
  removeQuantity(data: any[]) {
    const finalupdate: { id: string; item_quantity: number }[] = [];
    data.forEach((item) => {
      const temp = {
        id: item.id,
        item_quantity: item.item_quantity >= 1 ? item.item_quantity - 1 : 0,
      };
      finalupdate.push(temp);
    });
    console.log(finalupdate, data);
    return this.apiService.apiPut('gadget/bulk', finalupdate);
  }
}
