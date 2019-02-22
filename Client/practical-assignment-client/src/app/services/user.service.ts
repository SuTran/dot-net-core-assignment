import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from 'src/API/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById = (username: string) => {
    console.log(Urls.UserApi.GetUserByIdAsync + username);
    return this.http.get(Urls.UserApi.GetUserByIdAsync + username);
  }

  login = (user: any): Observable<any> => {
    return this.http.post<any>(Urls.UserApi.LoginAsync, user);
  }
}
