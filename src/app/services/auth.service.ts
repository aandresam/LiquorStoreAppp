import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Credentials } from '../interfaces/Credentials';

const URL = 'https://localhost:7236/api/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  authenticate(credentials: Credentials): Observable<ApiResponse>{
    console.log(credentials)
    return this.http.post<any>(`${URL}/login`, credentials);
  }

  register(credentials: Credentials): Observable<ApiResponse>{
    console.log(credentials)
    return this.http.post<any>(`${URL}/register`, credentials);
  }
}
