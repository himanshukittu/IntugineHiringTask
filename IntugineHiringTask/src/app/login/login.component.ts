import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  userName:string;
  password:string;
  _IsInvalid:boolean=false;

  constructor(private generalService:GeneralService,private route:Router) { }

  ngOnInit() {
  }

  onLogin():void
  {
    if(!this.userName || !this.password || this.password.length==0 || this.userName.length==0)
    {
      this._IsInvalid=true;
    }
    else{
      this.generalService.logIn(this.userName,this.password).subscribe(response=>{
        sessionStorage.setItem("auth-token",response['token']);
        // console.log(response);
        this.route.navigateByUrl("/dashboard");
      },err=>{
        this._IsInvalid=true;
        console.log(err);
      });
    }
  }

}
