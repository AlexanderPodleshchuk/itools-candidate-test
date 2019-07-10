import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    uri = 'http://localhost:3000/';
    constructor(private http: HttpClient) { }
    addUserEmail(user: User) {
      return this.http.post<User>(`${this.uri}api/users/send-email/`, user);
    }

  }
  