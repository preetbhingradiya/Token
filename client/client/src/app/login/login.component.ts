import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './login.component.html',
  providers:[UserService]
})
export class LoginComponent {

  message:string=''

  userService=inject(UserService)

  constructor(private route:Router){}

  fromsdata=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

  loginUser(data:any){
    this.userService.loginUserData(data.value).subscribe(res=>{
      if(res){
        Swal.fire(`welcome Back ${res.username} to the our website`)
        this.route.navigate(['profile'])
      }
    },err=>{
      this.message=err.error.message
        if(err.error.message=='User Not Found'){
          setTimeout(()=>{
            this.route.navigate(['register'])
          },1000)
        }
    })
  }


}
