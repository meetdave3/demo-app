import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MadinaAppsService } from './../../services/madinaApps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MadinaAppsService ]
})
export class LoginComponent implements OnInit {

  title = 'app';
  username: String = 'tf1l1@test.com(::)2';
  password: String = 'test123';
  loading: Boolean = false;
  error: Boolean = false;
  incorrectpass: Boolean = false;

  constructor(public router: Router, public madinaAppsService: MadinaAppsService) {}

  ngOnInit() {
  }

  authenticate(username, password) {

    this.loading = true;
    this.error = false;
    this.incorrectpass = false;

    this.madinaAppsService.login(username, password)
    .subscribe(
      data => {
        console.log(data);
        if (data === null || data === undefined) {
          console.log('Unknown Error ');
          this.loading = false;
          this.error = true;
          this.incorrectpass = false;
          return;
        } else if (data === 'success') {
          this.router.navigate(['/dashboard']);
        } else if (data === 'incorrectpass') {
          this.loading = false;
          this.error = false;
          this.incorrectpass = true;
          return;
        } else if (data === 'error') {
          this.loading = false;
          this.error = true;
          this.incorrectpass = false;
        }
      },
      error => {

      }
    )
  }

}