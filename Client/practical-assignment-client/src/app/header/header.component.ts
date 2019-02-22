import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: UserModel;
  flatBtn: boolean;

  constructor() { }

  ngOnInit() {
    this.user = new UserModel();
    this.userData();
  }

  userData = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data !== null) {
      this.user.userName = data.username;
      console.log('====================================');
      console.log(this.user.userName);
      console.log('====================================');
      this.flatBtn = true;
    } else {
      this.flatBtn = false;
    }
  }

  onLogout = () => {
    localStorage.removeItem('user');
    this.refresh();
  }

  refresh = () => {
    window.location.reload();
  }
}
