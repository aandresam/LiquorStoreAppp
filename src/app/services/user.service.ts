import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { PasswordUpdate } from '../interfaces/PasswordUpdate';
import { User } from '../interfaces/User';
import { JwtService } from './jwt.service';

const URL = 'http://german.somee.com/api/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }


  getProfile() : Observable<ApiResponse>{
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.get<any>(`${URL}/get-profile`, { headers: headers });
  }

  updateProfile(user: any) : Observable<ApiResponse>{
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.put<any>(`${URL}/update-profile`, user, { headers: headers });
  }

  updatePassword(password: PasswordUpdate) : Observable<ApiResponse>{
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    console.log(password)
    return this.http.patch<any>(`${URL}/set-password`, password, { headers: headers });
  }

  deleteAccount() : Observable<any>{
    let token = this.jwtService.getToken();
    const headers = { Authorization: 'Bearer ' + token}
    return this.http.delete<any>(`${URL}/delete-account`,  { headers: headers });
  }
}
