import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialogue:MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(


      catchError((error:HttpErrorResponse)=>{
        let errormessage='An unknown error occured!';
        if(error.error.message){
          errormessage=error.error.message
        }
        this.dialogue.open(ErrorComponent,{data:{message:errormessage}});

        return throwError(error.error.message)
      })
    );
  }
}
