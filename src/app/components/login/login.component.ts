import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../service/auth.service";
import { MyNavComponent } from "../my-nav/my-nav.component";
import { User } from "../../modules/user"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  username: string;
  password: string;
  person = new User();  
  
  constructor(
    public navComp: MyNavComponent,
    private router: Router,
    public authServices: AuthService
    ) {}  
  
  ngOnInit() {
    this.navComp.title = "Login"
    if (JSON.parse(localStorage.getItem('user')) != null){

      this.navComp.bool_login = true
      this.router.navigate(["/home"]);
    }
  }
  
  login(){
    let res;
    this.authServices.signIn(this.person).subscribe(data => {
      res = data;
      localStorage.setItem('user', JSON.stringify(res))
      localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
      this.router.navigate(["/home"]);
    }, error => {
      console.info(error);
    })
  }
  loginAnonymous(){
    let res;
    this.authServices.signInAnonymous().subscribe(data => {
      res = data;
      localStorage.setItem('user', JSON.stringify(res))
      localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
      this.router.navigate(["/home"]);
    }, error => {
      console.info(error);
    })
  }
}


