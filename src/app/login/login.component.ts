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
    console.log("After Logout =>" + sessionStorage.getItem("id"));       
  }
  
  onSubmit(){
     this.logindata = <LoginModel> this.loginForm.value;
     this.loginservice.login(this.logindata)
     .subscribe(
       res=>{
        //  if(res.httpStatus == 404){
        //    alert(res.message);
        //  }
        //  else{
        //    sessionStorage.setItem("id",res.userData.id);
        //    this.loginservice.successful();
        //  }
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
