import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  userId: any;
  constructor(private authToken: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokens = this.authToken.getToken();
    this.authToken.userSubject.subscribe((res) => {
      this.userId = res;
      console.log(res);
    });
    let haders = new HttpHeaders({
      Authorization: '' + tokens,
    });

    haders = haders.set('UserId', this.userId);
    if (!this.userId || this.userId === '') {
      return next.handle(req);
    }


      const auth = req.clone({
        // headers: req.headers.set("Authorization", '' + tokens)
        headers: haders,
      });

      console.log(auth);
      return next.handle(auth);

  }
}
