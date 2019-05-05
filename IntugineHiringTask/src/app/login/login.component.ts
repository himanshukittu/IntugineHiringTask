import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

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

  constructor(private generalService:GeneralService) { }

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
        console.log(response);
      },err=>{
        this._IsInvalid=true;
        console.log(err);
      });
    }
  }

}
