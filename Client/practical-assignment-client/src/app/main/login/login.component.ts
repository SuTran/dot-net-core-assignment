import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;
  public error = 0;
  constructor(
    public routerService: Router
  ) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem('user')) {
      this.routerService.navigate(['main-child']);
    }
  }

  onLogin = () => {
    if (this.userName === 'admin' && this.password === '123456') {
      const userInfo = {
        username: this.userName,
        password: this.password
      };
      console.log('userInfo', userInfo);

      localStorage.setItem('user', JSON.stringify(userInfo));
    } else {
      this.error = -1;
    }
  }

}
