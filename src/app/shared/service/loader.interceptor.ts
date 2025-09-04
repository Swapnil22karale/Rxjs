import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private _loaderService : LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.loadingStateEmiter(true)
    const reqClone = request.clone({
      setHeaders : {
        'auth' : 'token from LocalStorage',
        'content-type' : 'application/json'
      }
    }) 
    return next.handle(reqClone)
                .pipe(
                  finalize(()=>{
                    this._loaderService.loadingStateEmiter(true)
                  })
                )
  }
}
