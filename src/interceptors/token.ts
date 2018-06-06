import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators/mergeMap';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storage: Storage) { }

  getToken(): Promise<any> {
    return this.storage.get('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(this.getToken()).pipe(mergeMap(token => {
      if (token) {
        const newReq = req.clone({ headers: req.headers.set('x-access-token', token) });
        return next.handle(newReq);
      }
      return next.handle(req);
    }));
  }
}

