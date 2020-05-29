import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.service';
import { tokenUtil } from 'src/app/shared/utils/tokenUtil';
import { Md5 } from 'ts-md5';
import { showNotification } from 'src/app/shared/utils/notifyUtil';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: number = null;
  user_id: number = null;
  password: string = '';
  confirm_password: string = '';
  lock_edit = true;

  constructor(private _route: ActivatedRoute, private router: Router, private user_service: UsersService) { }

  ngOnInit(): void {
    this.user_id = (sessionStorage.getItem('user_id') == null) ? null : parseInt(sessionStorage.getItem('user_id'));

    if (this.user_id == null) {
      this.token = this._route.snapshot.params.token;

      if (this.token == null) {
        this.router.navigate(['/miscellaneous/error404']);
      } else {
        this.validateToken();
      }
    } else {
      this.verifySession();
    }
  }

  get validatePassword() {
    return !(this.password === this.confirm_password && (this.password !== '' && this.confirm_password !== '' && !this.lock_edit));
  }

  changePassword() {
    const body = {
      id: this.user_id,
      password: new Md5().appendStr(this.password).end()
    }

    this.user_service.updateProfile(body).toPromise().then(
      (result: any) => {
        showNotification('Se cambio el password con exito', 2, '', true).then((result) => {
          sessionStorage.clear();
          this.router.navigateByUrl('/authentication/login');
        });
      },
      msg => {
        if (msg.status == 406) {
          tokenUtil(this.router);
        }
      }
    );
  }

  verifySession() {
    this.user_service.verifySession().subscribe(
      (result: any) => {
        if ( result.result === undefined ) {
          this.router.navigate(['/miscellaneous/error404']);
        } else {
          this.lock_edit = false;
        }
      },
      msg => {
        this.router.navigate(['/miscellaneous/error404']);
      }
    );
  }

  validateToken() {
    this.user_service.verifyToken(this.token).subscribe(
      (result: any) => {
        if ( result.result.expired !== undefined ) {
          if (result.expired === 1) {
            this.router.navigate(['/miscellaneous/error404']);
          } else {
            this.user_id = result.result.user_id;
            this.lock_edit = false;
          }
        } else {
          this.router.navigate(['/miscellaneous/error404']);
        }
      },
      msg => {
        this.router.navigate(['/miscellaneous/error404']);
      }
    );
  }

}
