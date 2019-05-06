import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService 
{
  headers:HttpHeaders;

  constructor(private http:HttpClient) {
    this.headers=new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization":`Bearer ${sessionStorage.getItem("auth-token")}`
    })
   }

  getDevices()
  {
    return this.http.get("https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices",{headers:this.headers});
  }

  getDeviceLocation(deviceName:string,page?:number)
  {
    if(!page)
    {
      return this.http.get(`https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest?device=${deviceName}`,{headers:this.headers});
    }
    else{
      return this.http.get(`https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest?device=${deviceName}&page=${page}`,{headers:this.headers});
    }
  }
}
