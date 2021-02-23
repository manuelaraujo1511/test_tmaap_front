import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private http: HttpClient,
  ) { }

  getTranslate(data): Observable<any>{
    
    const headers = {
      'content-type': 'application/json',
      'accept': '*/*'
    }
    const body=JSON.stringify(data);
    return this.http.post(
      environment.api_translate,
      body,
      {'headers':headers}
    )
  }
}
