import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent {

  verifyResetCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null,[Validators.required])
  })

  apiErrorMeassage:string = '';
  isLoading = false;

  constructor(private _AuthService:AuthService , private _Router:Router){}

  handleVerifyResetCode()
  {
    this.isLoading = true;
    this._AuthService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next:()=>{
        this._Router.navigate(['/resetPassword'])
        this.isLoading = false;
      },
      error:(err)=>{
        this.apiErrorMeassage = err.error.message
        this.isLoading = false;
      }
    })
  }
}
