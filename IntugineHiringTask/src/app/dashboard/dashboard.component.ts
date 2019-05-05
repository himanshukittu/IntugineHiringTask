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
  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 15;

  constructor(private dashboardService:DashboardService) { }

  ngOnInit() 
  {
    this.dashboardService.getDevices().subscribe(response=>{
      // console.log(response);
      this.devices=response['result'];
      console.log(this.devices);
    })
  }

}
