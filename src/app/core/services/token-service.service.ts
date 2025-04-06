import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenServiceService {
  private tokenKey = 'authToken'; // Key used for localStorage
  constructor() {}

  // Method to store the token
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Store the token in localStorage
  }

  // Method to retrieve the token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Get the token from localStorage
  }

  // Method to remove the token (for logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey); // Remove the token from localStorage
  }
}
