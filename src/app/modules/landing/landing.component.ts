import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternationalizationUtil } from '../../shared/utils/internationalizationUtil';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user: any = {};
  remember: boolean = false;
  loading = false;
  is_log: boolean;
  lbl: InternationalizationUtil = new InternationalizationUtil(this.http,0);

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  ngOnInit() {
    // this.verifyClient();
    this.is_log = (sessionStorage.getItem('user_token') !== null) ? true : false;
    this.lbl.moduleVerificTags();
  }

  // verifyClient () {
  //   this.client_service.getClient().toPromise().then(
  //     result => {
  //       let body: any = result;

  //       if ( body.exist )
  //         this.router.navigate(['login']);
  //       // console.log('resultado', body);
  //     },
  //     msg => {
  //       notifyManage(msg);
  //     }
  //   );
  // }

  openLoginModal() {
    setTimeout(function(){
      $('#LoginLandingModal').appendTo('body').modal('show');
    }, 230);
  }

}
