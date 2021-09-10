import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
import { Post } from './post.model';
import { Router } from '@angular/router';
import { AuthService } from '../authenticat/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts:Post[],postCount:number}>();
  searchUpdated = new Subject<{posts:Post[]}>();
  constructor(private http:HttpClient,private router:Router,private auth:AuthService){}
searchB=new BehaviorSubject<boolean>(null)
getPosts(postperpage:number,currentPage:number) {
// let userId;
//   this.auth.userSubject.subscribe(res=>{
// userId=res
// })
  const queryparamss=`?pageSis=${postperpage}&Page=${currentPage}`;
    this.http.get<{message:string,post:any,maxposts:number}>('http://localhost:3000/api/post'+queryparamss).pipe(
      map(postData=>{
        console.log(postData,"upar")
      return{ posts:postData.post.map((datas:any)=>{
        console.log(datas,'huhuhuhuhuhuhuh')
        return {
          title:datas.title,
          content:datas.content,
          id:datas._id,
          imagep:datas.imagep,
         owner:datas.owner
      }}),
    maxposts:postData.maxposts}

    }))
    .subscribe(
      data=>{
        console.log(data,'neeche')
        this.posts=data.posts

        this.postsUpdated.next({posts:[...this.posts],postCount:data.maxposts})
      })

  }

  getPostUpdate() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string,image:File) {
 const formData=new FormData()
 formData.append("title",title),
 formData.append("content",content),
 formData.append("image",image)
    this.http.post<{message:string,postS:Post}>('http://localhost:3000/api/post/',formData).subscribe(response=>{
//       console.log(response.message)
// const post:Post={
//   id:response.postS.id,
//   title:response.postS.title,
//   content:response.postS.content,
//   imagep:response.postS.imagep
// }
// this.posts.push(post);
// this.postsUpdated.next([...this.posts]);
this.router.navigate(["/"]);
})
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string ,imagep:string}>(
      "http://localhost:3000/api/post/" + id
    );
  }

  updatePost(id: string, title: string, content: string ,image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagep: image
      };
    }
    this.http
      .put("http://localhost:3000/api/post/" + id, postData)
      .subscribe(response => {
        // console.log(response)
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        // const post: Post = {
        //   id: id,
        //   title: title,
        //   content: content,
        //   imagep:image

        // };
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }


deletePost(postID:string){
return this.http.delete('http://localhost:3000/api/post/'+postID)
}

}


