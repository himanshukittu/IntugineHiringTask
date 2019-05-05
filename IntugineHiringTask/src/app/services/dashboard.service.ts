import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getDevices()
  {
    return this.http.get("https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices",{headers:new HttpHeaders(
      {
        'Content-Type':  'application/json',
        "Authorization":`Bearer ${sessionStorage.getItem("auth-token")}`
      }
    )});
  }
}
