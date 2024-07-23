import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email])
  })

  isLoading = false;
  apiErrorMessage = '';

  constructor(private _AuthService:AuthService ,private _Router:Router){}

  handleForgetPassword()
  {
    this.isLoading = true;
    this._AuthService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next:(response)=>{console.log(response);
        this.isLoading = false;
        this._Router.navigate(['/verifyResetCode'])
      },
      error:(err)=>{console.log(err);
        this.apiErrorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }

}
