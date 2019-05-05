import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public LOGIN_API:string="https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/login"; 
  public GET_DEVICE_API:string="https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices";
}
