import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../modules/user";

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  signIn(user: User): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
    }  
    const body=JSON.stringify(user);
    return this.http.post(
      environment.api_url + '/auth/signin',
      body,
      {'headers':headers}
    )

    // return this.http.post(
    //   environment.api_url + '/auth/signin?username'+user.username+'&password='+user.password,
    //   h
    // );
  }

  signInAnonymous(): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
    }  
    return this.http.post(
      environment.api_url + '/auth/signin-any',
      {'headers':headers}
    )
  }

  logOut(){
    const headers = {
      'content-type': 'application/json',
    }  
    return this.http.post(
      environment.api_url + '/auth/logout',
      {'headers':headers}
    )
  }
}
