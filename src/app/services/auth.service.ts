import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/api/users";
  tokenURL: string = environment.apiURLBase + environment.getTokenURL;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getToken() {
    const tokenString = localStorage.getItem("access_token");
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.getToken();
    if(token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  getUserInfoAuthenticated() : any {
    const token = this.getToken();
    if(token) {
      const userInfo = this.jwtHelper.decodeToken(token);
      return userInfo;
    }
    return {};
  }

  logout() {
    localStorage.removeItem("access_token");
  }

  login(userName: string, password: string): Observable<any> {
    const params = new HttpParams()
                        .set("username", userName)
                        .set("password", password)
                        .set("grant_type", "password")
    
    const headers = {
      "Authorization": "Basic " + btoa(`${this.clientId}:${this.clientSecret}`),
      'Access-Control-Allow-Origin': "*",
      "Content-Type": "application/x-www-form-urlencoded"
    }

    return this.http.post(this.tokenURL, params.toString(), {headers});
  }
}
