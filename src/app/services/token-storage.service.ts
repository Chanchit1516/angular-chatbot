import { Injectable } from '@angular/core';
import { User } from '../models/User';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const USER_ID_KEY = 'currentUserId';
const USER_TYPE_KEY = 'currentUserType';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    localStorage.clear();
  }
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.setItem(TOKEN_KEY, token)
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    // return window.sessionStorage.getItem(TOKEN_KEY);
    return localStorage.getItem(TOKEN_KEY)
  }
  public saveUser(user: any, userType: any, userId: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(USER_TYPE_KEY)
    localStorage.removeItem(USER_ID_KEY)
    localStorage.setItem(USER_TYPE_KEY, userType)
    localStorage.setItem(USER_ID_KEY, userId)
    localStorage.setItem(USER_KEY, user)
  }
  public getUser(): User | null {
    // const user = window.sessionStorage.getItem(USER_KEY);
    let userModel = new User();
    userModel.user_id = Number(localStorage.getItem(USER_ID_KEY))
    userModel.user_name = localStorage.getItem(USER_KEY)
    userModel.user_type = localStorage.getItem(USER_TYPE_KEY)

    if (userModel?.user_id) {
      return userModel;
    }
    return null;
  }
}
