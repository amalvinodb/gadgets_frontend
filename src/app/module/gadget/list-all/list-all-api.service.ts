import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../../core/services/api-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class ListAllApiService {
  constructor(private apiService: ApiEndpointsService) {}
  getAllGadgetDetails() {
    this.apiService.apiGet('gadget').subscribe((data) => {
      console.log(data);
      return data;
    });
  }
}
