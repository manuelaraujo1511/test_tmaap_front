import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPostPublic(): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('accessToken'))
    }
    return this.http.get(
      environment.api_url + '/publications-approved',
      {'headers':headers}
    )
  }

  sendComment(comment): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('accessToken'))
    }
    const body=JSON.stringify(comment);
    return this.http.post(
      environment.api_url + '/comments',
      body,
      {'headers':headers}
    )
  }
  
  sendPost(content): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('accessToken'))
    }
    const body=JSON.stringify(content);
    return this.http.post(
      environment.api_url + '/publications',
      body,
      {'headers':headers}
    )
  }

  
  getPostByUser(user_id): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('accessToken'))
    }

    return this.http.get(
      environment.api_url + '/users/publications/'+user_id,
      {'headers':headers}
    )
  }
  
  getAllPost(): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('accessToken'))
    }

    return this.http.get(
      environment.api_url + '/users/publications',
      {'headers':headers}
    )
  }
  
  updatePost(post_id, content): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'x-access-token': JSON.parse(localStorage.getItem('accessToken'))
    }
    const body=JSON.stringify(content);
    return this.http.put(
      environment.api_url + '/publications/'+post_id,
      body,
      {'headers':headers}
    )
  }
  
}
