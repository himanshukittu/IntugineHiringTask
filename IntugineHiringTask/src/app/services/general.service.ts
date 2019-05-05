import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:HttpClient,private constants:ConstantsService) { }

  logIn(userName,password)
  {
    return this.http.post(this.constants.LOGIN_API,null,{headers:new HttpHeaders(
      {
        'Content-Type':  'application/json',
        "Authorization":`Basic ${btoa(userName+":"+password)}`
      }
    )});
  }


}
