import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentToken: string;
  private mainBlockId: number;

  constructor(private http: HttpClient) {
    this.currentToken = null;
  }

  public setMainBlockId(id: number) {
    this.mainBlockId = id;
    sessionStorage.setItem('mainBlockId', this.mainBlockId + '');
  }

  public getMainBlockId() {
    // tslint:disable-next-line: no-string-literal
    if (this.mainBlockId == null && sessionStorage['mainBlockId'] != null) {
      // tslint:disable-next-line: no-string-literal
      this.mainBlockId = sessionStorage['mainBlockId'];
    }
    return +(this.mainBlockId);
  }

  public currentTokenValue() {
    // tslint:disable-next-line: no-string-literal
    if (this.currentToken === null && sessionStorage['currentToken'] != null) {
      // tslint:disable-next-line: no-string-literal
      this.currentToken = sessionStorage['currentToken'];
    }
    return this.currentToken;
  }

  public setCurrentTokenValue(token: string) {
    this.currentToken = token;
    sessionStorage.setItem('currentToken', this.currentToken);
  }

  public login(username: string, password: string) {
    return this.http.post('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/authenticate'
      , { username, password });
  }

  public demo() {
    return this.http.get('http://projectmanagerbackend-env.eba-pkj4ac6b.us-east-1.elasticbeanstalk.com/demo');
  }

  public logout() {
    this.currentToken = null;
    sessionStorage.removeItem('currentToken');
    this.mainBlockId = null;
    sessionStorage.removeItem('mainBlockId');
  }

}
