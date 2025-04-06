import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointsService {
  private baseUrl = environment.apiUrl || 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  apiGet(endPoint: string) {
    console.log(environment.apiUrl);
    const url = this.baseUrl + '/' + endPoint;
    return this.httpClient.get(url);
  }
  apiPost(endPoint: string, body: any) {
    const url = this.baseUrl + '/' + endPoint;
    return this.httpClient.post(url, body);
  }
  apiPut(endPoint: string, body: any) {
    const url = this.baseUrl + '/' + endPoint;
    return this.httpClient.put(url, body);
  }
  apiDelete(endPoint: string) {
    const url = this.baseUrl + '/' + endPoint;
    return this.httpClient.delete(url);
  }
}
