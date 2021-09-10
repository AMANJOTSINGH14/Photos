import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { PostListComponent } from "./post/post-list/post-list.component";
import { PostCreateComponent } from "./post/post-create/post-create.component";
import { LoginComponent } from "./authenticat/login/login.component";
import { SignupComponent } from "./authenticat/signup/signup.component";
import { AuthGuard } from "./authenticat/auth.guard";
const routes: Routes = [
  { path: '', component: PostListComponent ,canActivate:[AuthGuard] },
  { path: 'create', component: PostCreateComponent,canActivate:[AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent ,canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'Signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class ApproutingModule {}
