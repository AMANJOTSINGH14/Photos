import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit ,OnDestroy{
isLoading=false;
subs:Subscription
auth:boolean;
  constructor(private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
 this.subs= this.authService.getAuthListener().subscribe((res)=>{
   console.log('inside signup nginoinit')
    this.auth=res
    if(!this.auth){
      this.route.navigate(['/Signup'])
      console.log('inside signup nginoinit a')
    }
    else{
      this.route.navigate(['/login'])
      console.log('inside signup nginoinitbbbv')
    }
  })
  }
  onSignup(form:NgForm){

  console.log(form)
  this.authService.createUser(form.value.email,form.value.password)
  // this.route.navigate(['/login'])
}
ngOnDestroy(){
this.subs.unsubscribe()
}
}
