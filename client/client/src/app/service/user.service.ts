import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  postUserData(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/api/register',data)
  }

  loginUserData(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/api/login',data,{withCredentials:true})
  }

  logoutUser(){
    return this.http.get("http://localhost:8000/api/logout",{withCredentials:true})
  }

  profileUser(){
    return this.http.get('http://localhost:8000/api/profile',{withCredentials:true})
  }

}
