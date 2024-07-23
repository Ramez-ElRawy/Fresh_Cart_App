import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-test',
  templateUrl: './register-test.component.html',
  styleUrls: ['./register-test.component.css']
})
export class RegisterTestComponent {
  handleSubmit(myForm:NgForm)
  {
    console.log(myForm);
  }
}
