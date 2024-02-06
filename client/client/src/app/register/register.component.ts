import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

 @Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './register.component.html',
  providers:[UserService]
})
export class RegisterComponent {

  message:string=''

  userService=inject(UserService)

  constructor(private route:Router){}

  fromsdata=new FormGroup({
    username:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  })

  registerUser(data:any){
    this.userService.postUserData(data.value).subscribe(res=>{
      console.log(res);
       Swal.fire(`welcome ${res.username} to the website`)
       this.route.navigate(['login'])
    },err=>{
      this.message=err.error.message
      setTimeout(()=>{
        this.route.navigate(['login'])
      },1500)
    })

  }
}
