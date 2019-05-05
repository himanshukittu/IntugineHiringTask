import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{
  devices:string[]=[];
  lat: number = 28.6129;
  lng: number = 77.2295;
  zoom: number = 5;
  selectedDeviceName:{}={};
  mapPointer:{lat:any,lng:any}[]=[];

  constructor(private dashboardService:DashboardService) { }

  ngOnInit() 
  {
    this.dashboardService.getDevices().subscribe(response=>
      {
      this.devices=response['result'];
      this.devices.forEach(element => {
        this.dashboardService.getDeviceLocation(element['device'],1).subscribe(res=>
          {
          if(res['result'].length>0)
          {
            console.log(res['result'][0]['gps']);
            this.mapPointer.push({lat:res['result'][0]['gps'][0],lng:res['result'][0]['gps'][1]});
          }
          });
      });
    });
  }

  checkBoxChange(event)
  {
    // if(this.selectedDeviceName[event.target.id]){
    //   delete this.selectedDeviceName[event.target.id];
    // }
    // else{
    //   this.selectedDeviceName[event.target.id]=true;
    // }
    // // console.log(this.selectedDeviceName);
    // let keyArr=Object.keys(this.selectedDeviceName);
    // keyArr.forEach(element => {
    //   this.dashboardService.getDeviceLocation(element).subscribe(response=>{
    //     console.log(response);
    //   });
    // });
  }

}
