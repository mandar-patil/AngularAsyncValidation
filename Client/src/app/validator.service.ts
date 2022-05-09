import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'WeatherForecast/emailexists?email=' + email);
  }
}
