import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/Custom Validations/match-password';
import { AuthService } from 'src/app/Services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^(02)?01[0125][0-9]{8}$/)])
  },{validators:passwordMatch});

  apiErrorMessage:string = '';
  isLoading = false;

  handlingRegister(regForm:FormGroup)
  {
    this.isLoading = true;
    this._AuthService.register(regForm.value).subscribe({
      next:()=>{
        this._Router.navigate(['/login']);
        this.isLoading = false;
      },
      error:(err)=>{
        this.apiErrorMessage = err.error.message;
        this.isLoading = false;
      }
      
    })
    // console.log(regForm);
  }
}
