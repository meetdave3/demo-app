import { Component, OnInit } from '@angular/core';
import { MadinaAppsService } from './../../services/madinaApps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ MadinaAppsService ]
})
export class DashboardComponent implements OnInit {

  familyData: any;
  loading: Boolean = false;
  nodata: Boolean = false;
  data: Boolean = false;


  constructor(public router: Router, public madinaAppsService: MadinaAppsService) { }

  ngOnInit() {
    this.loading = true;
    this.madinaAppsService.checkAccess()
    .subscribe(
      data => {
        console.log(data);
        if (data === 'success') {
          this.madinaAppsService.getData()
          .subscribe(
            data1 => {
              console.log(data1);
              if (data1 === 'nodata') {
                this.loading = false;
                this.nodata = true;
                this.data = false;
                return;
              } else if (data1 === 'error') {
                this.router.navigate(['/']);
                
                return;
              } else {
                this.loading = false;
                this.nodata = false;
                this.data = true;
                this.familyData = data1;
              }
            }
          )
        } else if (data === 'error') {
          this.router.navigate(['/']);
        }
      }
    );
  }

}
