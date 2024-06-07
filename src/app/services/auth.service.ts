import { Injectable } from '@angular/core';
import { loginParam } from '../models/authentication/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLogin(): boolean {
    let isLogin: boolean = false;
    if (typeof localStorage !== 'undefined') {
      isLogin = localStorage.getItem("username") ? true : false
    }
    return isLogin
  }

  localLogin(data: loginParam): void {
    localStorage.setItem("username", data.username)
    localStorage.setItem("token", data.token)
  }
}
