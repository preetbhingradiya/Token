import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationDirective } from './directives/authentication.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatButtonModule,MatIconModule,HttpClientModule,CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[UserService]
})
export class AppComponent implements OnInit {

  constructor(private userService:UserService){}

  message:string=''

  authentication:boolean=false

  ngOnInit(): void {
      AuthenticationDirective.authEmitters.subscribe((res)=>{
        this.authentication=res
      })
  }

  logOutUser(){
    this.userService.logoutUser().subscribe((res:any)=>{
      this.message=res.message
    },err=>{
      this.message=err.error.message
    })
  }

}
