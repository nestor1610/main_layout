import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { BananaConstants } from '../../config/constants';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class WebSocketService {


  is_log = false;
  token="";
  user = null;
  organization = null;
  charge = null;
  banana_client = null;
  appName = "laravel_";

  private socket;

  constructor(public http: HttpClient) {

    if ( sessionStorage.getItem('window_token') == null ) {

      let md5 = new Md5();

      md5.appendStr('somestring')
          .appendAsciiStr(Date());
      let val = md5.end();
      this.token =  val.toString()
       sessionStorage.setItem('window_token', this.token );
      //
    } else {
      this.token = sessionStorage.getItem('window_token');
    }

    this.user = sessionStorage.getItem('user_id') || null;
    this.organization = sessionStorage.getItem('organization_id') || null;
    this.banana_client = sessionStorage.getItem('third_id') || null;

    this.socket = io(BananaConstants.WsServer, { query: {
          'private':this.token,
          'user':this.user,
          'organization':this.organization,
          'banana_client':this.banana_client
        }
      });

   }

   public getMessages = () => {
    // console.log('getMessages: laravel_'+this.token)
    return Observable.create((observer) => {


        this.socket.on(this.appName+this.token, (message) => {
            observer.next(message);
        });

        if(this.banana_client != null){
          this.socket.on(this.appName+this.banana_client, (message) => {
            observer.next(message);
          });

          if(this.organization != null){
            this.socket.on(this.appName+this.banana_client+'_'+this.organization, (message) => {
              observer.next(message);
            });

            if(this.user != null){
              this.socket.on(this.appName+this.banana_client+'_'+this.organization+'_'+this.user, (message) => {
                observer.next(message);
              });
            }

            if(this.charge != null){
              this.socket.on(this.appName+this.banana_client+'_'+this.organization+'_'+this.charge, (message) => {
                observer.next(message);
              });
            }


          }
        }




        this.socket.on('connect', () => {
          console.log(this.socket.id); // 'G5p5...'
        });

    });
  }




}
