import { Component, OnInit, Output ,EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Post } from '../post.model';
import {mimtype} from '../mim.validator'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
isLoading=false;
  mode='create'
postId:string | null;
post:Post;
form:FormGroup;
Preview:string|null|ArrayBuffer;
constructor(private postService:PostService ,private route:ActivatedRoute){

}

ngOnInit(): void {
  this.form=new FormGroup({
    title:new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
    content:new FormControl(null,{validators:[Validators.required]}),
    image:new FormControl(null,{validators:[Validators.required],asyncValidators:[mimtype]})
  })
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
   console.log(paramMap)
    if (paramMap.has("postId")) {
      this.mode = "edit";
      this.postId = paramMap.get("postId");
      this.isLoading = true;
      this.postService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = {id: postData._id, title: postData.title, content: postData.content,imagep:postData.imagep};
     this.form.setValue({title:this.post.title,content:this.post.content,image:this.post.imagep})
      });
      this.postService.getPost(this.postId)
console.log(this.postService.getPost(this.postId))

    } else {
      this.mode = "create";
      this.postId = null;
    }
  });
}
imagePick(event:Event){
const file=(event.target as HTMLInputElement).files[0];
this.form.patchValue({
  image:file
});
this.form.get('image')?.updateValueAndValidity()
const reader=new FileReader()
reader.onload=() =>{
  this.Preview=reader.result;
  console.log('hey')
}
console.log('bye')
reader.readAsDataURL(file)
console.log(file)
console.log(this.form)
}
onadd(){

  // if (this.form.invalid) {
  //   return;
  // }
  this.isLoading=true;
  if (this.mode === "create") {
    this.postService.addPost(this.form.value.title, this.form.value.content,this.form.value.image);
  } else {
    this.postService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.image

    );
  }
  console.log(this.form)
  this.form.reset();
}
}
