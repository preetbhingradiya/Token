import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthenticationDirective } from '../directives/authentication.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './profile.component.html',
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  message: string = ''
  success: string = ''

  dataShow:boolean=false

  data:any

  userService = inject(UserService)

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.userService.profileUser().subscribe((res: any) => {
      this.success = `Hii this is ${res.username}'s profile`
      this.data=res
      this.dataShow=true
      AuthenticationDirective.authEmitters.emit(true)

    },
      err => {
        this.message = err.error.message
        AuthenticationDirective.authEmitters.emit(false)
    })
  }

}
