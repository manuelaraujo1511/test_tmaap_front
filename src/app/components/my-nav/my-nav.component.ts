import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: 'app-my-nav',
    templateUrl: './my-nav.component.html',
    styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {
    title = "";
    User: any
    bool_login = true;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );
    constructor(
        public authServices: AuthService,
        private breakpointObserver: BreakpointObserver,
        public route: Router
         
    ) {}

    ngOnInit() {
        if (localStorage.getItem('user')){
            this.bool_login = true
            this.User = JSON.parse(localStorage.getItem('user'))
        }else{
            this.bool_login = false          
        }
    }

    goToLogin() {
        this.route.navigate(['/login'])
    }
    
    goToHome() {
        this.route.navigate(['/home'])
    }
    
    logout() {
        this.authServices.logOut().subscribe(data => {
            localStorage.removeItem('user')
            this.route.navigate(['/login'])
            this.bool_login = false
        })        
    }
}
