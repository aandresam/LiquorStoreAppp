import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { ProductRequest } from '../interfaces/ProductRequest';
import { JwtService } from './jwt.service';

//const URL = 'http://german.somee.com/api/products'
const URL = 'https://localhost:7236/api/products'


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}


  getAll() : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.get<any>(`${URL}`, { headers: headers });
  }

  getById(id: number): Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.get<any>(`${URL}/${id}`, { headers: headers });
  }

  create(product: ProductRequest) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.post<any>(`${URL}`, product, { headers: headers });
  }

  update(id: number, product: ProductRequest) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.put<any>(`${URL}/${id}`, product, { headers: headers });
  }

  deleteById(id: number): Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    console.log(id)
    return this.http.delete<any>(`${URL}/${id}`, { headers: headers });
  }
}
