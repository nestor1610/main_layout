import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/core/services/access/access.service';
import { AuthBanana } from 'src/app/shared/utils/auth';
import { showNotification } from 'src/app/shared/utils/notifyUtil';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-locksesion',
  templateUrl: './locksesion.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class LockSesionComponent implements OnInit {
  email: string = null;
  password: string = null;
  name: string = null;

  constructor(private access_service: AccessService, public router: Router) { }

  ngOnInit(): void {
    AuthBanana(this.router);
    this.email = sessionStorage.getItem('user_email');
    this.name = sessionStorage.getItem('contact_name');
  }

  verifyCredentials() {
    const md5 = new Md5();
    let set_password = md5.appendStr(this.password).end();

    if (set_password === sessionStorage.getItem('user_password') && this.email === sessionStorage.getItem('user_email')) {
      sessionStorage.removeItem('locksesion');
      this.router.navigateByUrl('/app/banana-desktop');
    }
    else {
      showNotification('Email o password incorrectos', 4);
    }
  }

  logout() {
    sessionStorage.clear();
  }

}
