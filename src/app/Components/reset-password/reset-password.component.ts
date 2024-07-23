import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required , Validators.email]),
    newPassword: new FormControl(null,[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)])
  })

  constructor(private _AuthService:AuthService , private _Router:Router){}

  apiErrorMessage:string = '';
  isLoading = false;

  handleResetPassword()
  {
    this.isLoading = true;
    this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:()=>{
        this.isLoading = false;
        this._Router.navigate(['/login'])
      },
      error:(err)=>{
        this.apiErrorMessage = err.error.message
        this.isLoading = false;
      }
    })
  }
}
