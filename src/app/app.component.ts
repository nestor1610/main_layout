import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(/* private http: HttpClient, public router: Router */) {}

  ngOnInit () {
    // if ( sessionStorage.getItem('user_token') == null ) {
    //   this.verifyClient();
    // }
    // else {
    //   if ( AuthBanana(this.router) )
    //     this.router.navigate(['app']);
    // }
  }

  /* verifyClient () {
    const options = {
      headers: new HttpHeaders().set('authorization', window.location.origin)
        .set('app', 'BananaCli')
    };
    
		this.http.get(BananaConstants.urlServer+'api/evaluate-client', options).toPromise().then(
      result => {
        let body: any = result;

        if ( body.exist )
          this.router.navigate(['login']);
        else
          this.router.navigate(['home']);
        // console.log('resultado', body);
      },
      msg => {
        notifyManage(msg);
      }
    );
  } */
}
