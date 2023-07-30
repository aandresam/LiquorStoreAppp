import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { JwtService } from './jwt.service';

const URL = 'https://localhost:7236/api/products'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}


  create(category: any) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.post<any>(`${URL}`,  category , { headers: headers });
  }

  getAll() : Observable<any> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.get<any>(`${URL}`, { headers: headers });
  }

  getById(id: number) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.get<any>(`${URL}/${id}`, { headers: headers });
  }

  update(category: any) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.put<any>(`${URL}`,  category , { headers: headers });
  }

  deleteById(id: number) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.delete<any>(`${URL}/${id}`, { headers: headers });
  }
}
