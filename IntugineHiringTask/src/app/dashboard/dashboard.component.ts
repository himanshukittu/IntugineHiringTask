import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import datetimeDifference from "datetime-difference";
 

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
  selectedDeviceDetails:{}={};
  mapPointer:{lat:any,lng:any}[]=[]; 
  arrOfKeys:any[]=[];
  _Loaded:boolean=false;
  count:number=0;
  icon:{}={url: './assets/dot.png',scaledSize: { width: 10, height: 10 }};
  iconArrow:{}={url:"https://assetsstatic.s3.ap-south-1.amazonaws.com/navigation.svg",scaledSize:{width:25  ,height:25}};
  iconStatic:{}={url: 'https://assetsstatic.s3.ap-south-1.amazonaws.com/lhalt.svg',scaledSize: { width: 25, height: 25 }}

  constructor(private dashboardService:DashboardService) { }

  ngOnInit() 
  {
    this.dashboardService.getDevices().subscribe(response=>
      {
      this.devices=response['result'];
      this.devices.forEach(element => {
        this.dashboardService.getDeviceLocation(element['device'],1).subscribe(res=>{
          if(res['result'].length > 0)  
          {
            this.mapPointer.push({lat:res['result'][0]['gps'][0],lng:res['result'][0]['gps'][1]});
          }
        },()=>{
          this._Loaded=true;
        });
      });
    },err=>{});
  }

  checkBoxChange(event)
  {
    this._Loaded=false;
    console.log(event.target.checked);
    if(event.target.checked)
    {
      this.selectedDeviceDetails[event.target.id]=[];
      for(let page=1;page<=50;page++)
      {
        this.dashboardService.getDeviceLocation(event.target.id,page).subscribe(response=>{
          if(response['result'].length>0)
          {
            response['result'].forEach((element,index) => {
              // console.log(element['createdAt']);
              this.selectedDeviceDetails[event.target.id].push( 
                {index:index+1*page , timeStamp:element['createdAt'], lat:element['gps'][0] , lng:element['gps'][1],
                 static:this.getDistanceLessThan300(
                  {
                    lat:(this.selectedDeviceDetails[event.target.id][index-1]) ? this.selectedDeviceDetails[event.target.id][index-1].lat : element['gps'][0],
                    lng:(this.selectedDeviceDetails[event.target.id][index-1]) ? this.selectedDeviceDetails[event.target.id][index-1].lng : element['gps'][1]
                  },
                  {lat:element['gps'][0] , lng:element['gps'][1]}) // && this.timeMoreThan5(element["createdAt"],(this.selectedDeviceDetails[event.target.id][index-1])?this.selectedDeviceDetails[event.target.id][index-1].timeStamp:element['createdAt'])
                });
            },()=>{
              this._Loaded=true;
            });
          }
        }
        ,()=>{
          this._Loaded=true;
        })
      }
      this.arrOfKeys=Object.keys(this.selectedDeviceDetails);
    }
    else{
      delete this.selectedDeviceDetails[event.target.id];
    }
  }

  getSelectedDeviceDetailsLength():number{
    return Object.keys(this.selectedDeviceDetails).length;
  }

  timeMoreThan5(time1,time2)
  {
   let diff=datetimeDifference(new Date(time1),new Date(time2));
   console.log(diff);
   if(diff['years']>=0 && diff['month']>=0 && diff['days']>=0 && diff['hours']>=0 && diff['minutes']>5)
   {
     console.log("inside kjsdakjkjdsakjasd");
     return true;
   }
   else
    {return false;}
  }

  //functions for getting distance between 2 co-ordinates
  rad(x:number) {
    return x * Math.PI / 180;
  };
  
  getDistanceLessThan300(p1, p2):boolean
  {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.rad(p2.lat - p1.lat);
    let dLong = this.rad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *  Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d<300; // returns the distance >300
  };

  

}
