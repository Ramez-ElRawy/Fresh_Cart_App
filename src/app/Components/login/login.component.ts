import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  apiErrorMessage:string = '';
  isLoading = false;
  logInSubscribtion!:Subscription;
  decodedToken!:any;

  constructor(private _AuthService:AuthService , private _Router:Router){}

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required , Validators.email]),
    password: new FormControl(null,[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)])
  })

  handleLogin()
  {
    this.isLoading = true;
    this.logInSubscribtion = this._AuthService.logIn(this.loginForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        localStorage.setItem('token',response.token);

        // token decoded
        const token = response.token;
        this.decodedToken = jwtDecode(token);
        localStorage.setItem('userId',this.decodedToken.id);
        this._AuthService.userIDSubject.next(this.decodedToken.id);
        console.log(this._AuthService.userIDSubject);
        
        this._Router.navigate(['/home']);
        this.isLoading = false;
        this._AuthService.isLoggedSubject.next(true)
      },
      error:(err)=>{
        this.apiErrorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }

  ngOnDestroy(): void {
    // this.logInSubscribtion.unsubscribe();
  }

}
