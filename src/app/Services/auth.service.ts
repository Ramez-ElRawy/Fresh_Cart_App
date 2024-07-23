import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegForm } from '../Interfaces/reg-form';
import { LogInForm } from '../Interfaces/log-in-form';
import { Router } from '@angular/router';
import { ForgetPasswordForm } from '../Interfaces/forget-password-form';
import { VerifyResetCodeForm } from '../Interfaces/verify-reset-code-form';
import { ResetPasswordForm } from '../Interfaces/reset-password-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedSubject = new BehaviorSubject<boolean>(localStorage.getItem('token')? true : false)
  
  userId:string|null = localStorage.getItem('userId');
  userIDSubject = new BehaviorSubject<string|null>(this.userId);

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }

  register(regForm:RegForm):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',regForm)
  }

  logIn(LogInForm:LogInForm):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',LogInForm)
  }

  logOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this._Router.navigate(['/login'])
    this.isLoggedSubject.next(false);
    // this.isLoggedInVar = false;
  }

  forgetPassword(ForgetPasswordForm:ForgetPasswordForm):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',ForgetPasswordForm)
  }

  verifyResetCode(VerifyResetCodeForm:VerifyResetCodeForm):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',VerifyResetCodeForm);
  }

  resetPassword(ResetPasswordForm:ResetPasswordForm):Observable<any>
  {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',ResetPasswordForm);
  }
}
