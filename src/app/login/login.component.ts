import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private logindata: LoginModel = {
    username:'',
    password:''
  };
  
  loginForm = new FormGroup({
  username : new FormControl('',[Validators.required]),
  password : new FormControl('',[Validators.required])
});
  constructor(private loginservice : LoginService) { }

  ngOnInit() {
    console.log("After Logout =>" + sessionStorage.getItem("username"));       
  }
  
  onSubmit(){
     this.logindata = <LoginModel> this.loginForm.value;
     this.loginservice.login(this.logindata)
     .subscribe(
       res=>{
         if(res.token == null){
           alert("Wrong Username and Password");
         }
         else{
           sessionStorage.setItem("username",this.logindata.username);
           let tokenStr = 'Bearer ' + res.token;
           sessionStorage.setItem("token",tokenStr);
           this.loginservice.successful();
         }
        console.log(res);
       },
       err=>{
         alert("an error occurred while logging in");
       }
     );
   }

}

export interface LoginModel{
  username: string;
  password: string;
}
