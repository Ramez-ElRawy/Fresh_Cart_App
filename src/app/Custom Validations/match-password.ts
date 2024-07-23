import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MatchPassword{
    // validate(control:AbstractControl):ValidationErrors | null{
    //     let password = control.value.password;
    //     let rePassword = control.value.rePassword;
    //     if(password == rePassword && password && rePassword){
    //         return null;
    //     }
    //     else{
    //         return {MisMatchPassword:true}
    //     }
    // }
}

export let passwordMatch = (control:AbstractControl):ValidationErrors|null=>{
    let {password,rePassword} = control.value;
    return password == rePassword && password && rePassword? null:{MisMatchPassword:true};
}
