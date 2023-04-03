import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private token?: any;
  private existToken: boolean;

  constructor() { 
    this.token = '';
    this.existToken = false;
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  getToken(): any{
    this.existToken = localStorage.getItem('token') != null;
    
    if(!this.existToken)
      return 'Unauthorized';

    this.token = localStorage.getItem('token') ?? "Unauthorized";
    return this.token;
  }
}
