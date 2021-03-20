import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import 'rxjs/add/operator/do';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  

  constructor(private injector: Injector,private tokenService: NbAuthJWTToken) {
  }

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.tokenService.getValue()}`
        }
    });
    
    return next.handle(request);
  }
/*
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue")});
    return next.handle(authReq)
        .catch((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log("Error Occurred");
        console.log(error);
        //return the error to the method that called it
        return Observable.throw(error);
        }) as any;
  }*/

}