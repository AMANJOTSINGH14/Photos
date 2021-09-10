import { Component, OnInit , Input} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
postSubscribe:Subscription;
isLoading=false;
currentPage:number;
postPerPage:number;
pageSizeOptions=[1,2,5,7,10];
totalPost:number;
  constructor(private postService:PostService) { }
 post:Post[]=[]
ngOnInit() {
  console.log('ih')
  this.isLoading=true;
  this.postService.getPosts(this.postPerPage,this.currentPage);
  this.postSubscribe = this.postService.getPostUpdate()
    .subscribe((postData:{posts: Post[],postCount:number}) => {
      this.isLoading=false;
    console.log(postData.postCount)
      this.totalPost=postData.postCount;
      this.post = postData.posts;
    });

  this.postSubscribe= this.postService.searchUpdated.subscribe((va:any)=>{

      this.post=va
    })




      }


onDelete(postid:string){
  this.isLoading=true;
this.postService.deletePost(postid).subscribe(()=>{
  this.postService.getPosts(this.postPerPage,this.currentPage);
})
}
onChangePage(page:PageEvent){
  console.log(page)
  this.isLoading=true;

  this.currentPage=page.pageIndex;
this.postPerPage=page.pageSize;
this.postService.getPosts(this.postPerPage,this.currentPage);
console.log("oh",page.pageIndex)
}
ngOnDestroy() {
  this.postSubscribe.unsubscribe();
}
}
