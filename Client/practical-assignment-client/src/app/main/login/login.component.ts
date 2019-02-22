import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserModel } from 'src/app/models/userModel';
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string;
  public user: UserModel;
  constructor(
    public routerService: Router,
    private userService: UserService,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.user = new UserModel();
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem('user')) {
      this.routerService.navigate(['data-binding']);
    }
  }

  onLogin = () => {
    const data = {
      username: this.user.userName
    };
    this.userService.login(data)
      .subscribe((res: any) => {
        if (res.status === true) {
          this.refresh();
          this.toastr.successToastr(res.message, 'Success!');
          this.getUserById(data.username);
        } else {
          this.toastr.errorToastr(res.message, 'Error!');
        }

      });
  }

  refresh = () => {
    window.location.reload();
  }
  getUserById = (userName: any) => {
    this.userService.getUserById(userName)
      .subscribe((res: any) => {
        if (res.status === true) {
          this.user = res.data;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      });
  }

}
