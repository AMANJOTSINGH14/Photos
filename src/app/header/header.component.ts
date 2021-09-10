import { Component, OnDestroy, OnInit ,ElementRef,ViewChild, AfterViewInit} from '@angular/core';
import{switchMap,filter,concatMap, map} from 'rxjs/operators'
import { Post } from '../post/post.model';
import { Router } from '@angular/router';
import { Subscription,from,fromEvent,of } from 'rxjs';
import { AuthService } from '../authenticat/auth.service';
import {PostService} from '../post/post.service'
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy,AfterViewInit {
p:any
 searchs:any='sxs'
  unsub: Subscription;
  ob1:any
  ob:any
searchstatus:boolean
  userStatus: boolean = false;
  constructor(private auth: AuthService, private route: Router,private postService:PostService ) {}

  ngOnInit(): void {
this.auth.autoAuthUser()
  if (!this.userStatus) {
      this.route.navigate(['/login']);
    } else {
      this.route.navigate(['/']);
    }
    this.unsub = this.auth.getAuthListener().subscribe((res) => {
      console.log('ngt');
      if (!res) {
        this.route.navigate(['/login']);
      } else {
        this.route.navigate(['/']);
      }
      this.userStatus = res;
    });
    console.log("here")
    console.log(this.searchs)

    this.unsub=this.postService.getPostUpdate().subscribe(helo=>{
this.p=helo.posts
      this.ob1=of(helo.posts)
    })

  }
ngAfterViewInit():void{

}
onchanges(event:any){

  this.ob=of(event)
        this.ob.pipe(concatMap((h:string)=>{
          return this.ob1.pipe(


          map((v:any)=>{


   return v.filter((js:any)=>{



              return js.title.includes(h)
           })
          })
          )

          })).subscribe((helos:any)=>{
console.log(helos,'cdsc')
            if(helos===[]||helos.length===0){

              this.postService.searchUpdated.next(this.p)
              console.log(helos)

          }
else{

                this.postService.searchUpdated.next(helos)
}

          }
          )

}
  onLogout() {

    this.auth.logout();
  }
  ngOnDestroy() {

    this.unsub.unsubscribe();
  }
}
