import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Brand } from '../interfaces/Brand';
import { JwtService } from './jwt.service';


const URL = 'https://localhost:7236/api/brands'


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}


  create(brand: Brand) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.post<any>(`${URL}`,  brand , { headers: headers });
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

  update(brand: Brand) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    console.log(brand)
    return this.http.put<any>(`${URL}/${brand.Id}`,  brand , { headers: headers });
  }

  deleteById(id: number) : Observable<ApiResponse> {
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    console.log(id)
    return this.http.delete<any>(`${URL}/${id}`, { headers: headers });
  }
}
