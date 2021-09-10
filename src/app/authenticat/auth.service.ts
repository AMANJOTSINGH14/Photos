import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:string;
timer:any
auth:boolean=false;
userId:any
private authListener=new BehaviorSubject<boolean>(null)
userSubject=new BehaviorSubject<any>(null)
getToken(){
  return this.token
}
isAuth(){
return this.auth
}
getAuthListener(){
 return this.authListener.asObservable()
}
  constructor(private http:HttpClient) { }
createUser(email:string,password:string){
  const authData:AuthData={email:email,password:password};
  this.http.post("http://localhost:3000/api/user/signup",authData).subscribe(
    response=>{this.authListener.next(true)
      console.log(response)
    },error=>{
      console.log(error)
      this.authListener.next(false);
    }
  )
}
private saveAuthData(token: string, expirationDate: Date,userId:string) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("userId", userId);
}

private clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
}
autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.auth = true;
    this.userId=authInformation.userId
    this.setAuthTimer(expiresIn / 1000);
    this.authListener.next(true);
    this.userSubject.next(this.userId)
  }
}
private setAuthTimer(duration: number) {
  console.log("Setting timer: " + duration);
  this.timer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}
logout(){

  this.token=null;

this.authListener.next(false);

this.userSubject.next(null)
clearTimeout(this.timer)
this.clearAuthData()
}
login(email:string,password:string){
  const authData:AuthData={email:email,password:password};
  this.http.post<{token:string ,expiresIn: number,userId:string}>("http://localhost:3000/api/user/login",authData).subscribe(
    response=>{
      console.log(response)
      this.userId=response.userId;
      this.userSubject.next(this.userId)
      const expire=response.expiresIn
      this.setAuthTimer(expire);
      this.token=response.token;
this.authListener.next(true)
this.auth=true
const now = new Date();
const expirationDate = new Date(now.getTime() + expire* 1000);
console.log(expirationDate);
this.saveAuthData(this.token, expirationDate,this.userId);
    }
  )
}
private getAuthData() {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const userId = localStorage.getItem("userId");
  if (!token || !expirationDate) {
    return null
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate),
    userId:userId
  }
}
}

