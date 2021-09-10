import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PostListComponent } from './post/post-list/post-list.component';
import { ApproutingModule } from './approuting.module';
import { LoginComponent } from './authenticat/login/login.component';
import { SignupComponent } from './authenticat/signup/signup.component';
import {AuthInterceptorInterceptor} from './authenticat/auth-interceptor.interceptor'
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    ApproutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],

  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
