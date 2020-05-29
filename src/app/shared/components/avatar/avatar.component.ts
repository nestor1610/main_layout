import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/core/services/access/access.service';
import { BananaConstants } from '../../../core/config/constants';
import { notifyManage } from '../../utils/notifyUtil';
import { tokenUtil } from '../../utils/tokenUtil';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  // Objeto con propiedades de variables y funciones de JavaScript para usar en páginas web
  dataSession: any = {};

  user_password: string;
  contact_name: string;
  organization_name: string;
  image_name: string;
  BananaConstants: string;
  contact_charge: any;
  user: any;
  contact: any;
  @Output() openModalEvent = new EventEmitter<any>();

  constructor(private access_service: AccessService, public router: Router) { }

  ngOnInit(): void {
    this.user_password = sessionStorage.getItem('user_password');
    this.contact_name = sessionStorage.getItem('contact_name') || "User name";
    this.organization_name = sessionStorage.getItem('organization_name');
    this.image_name = (sessionStorage.getItem('image_name') == 'null') ? 'assets/img/avatar.png' : sessionStorage.getItem('image_name');
    this.contact_charge = sessionStorage.getItem('contact_charge') || "Puesto";
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.contact = JSON.parse(sessionStorage.getItem('contact'));


    this.dataSession.browser = navigator.appCodeName;
    this.dataSession.browserVer = navigator.appVersion;
    this.dataSession.browserCookie = navigator.cookieEnabled;
    this.dataSession.plataformBrowser = navigator.platform;
    this.dataSession.locationProtocol = location.protocol;
    this.dataSession.screenHeight = screen.height;
    this.dataSession.screenWidth = screen.width;




  }

  get multipleOrganizations() {
    return parseInt(sessionStorage.getItem('multiple_organizations'));
  }

  /**
   * Emite el evento que abre el modal de organizaciones
   *
   * @memberof AvatarComponent
   */
  emitOpenOrganizationModal() {
    this.openModalEvent.emit();
  }

  /**
   * Redirecciona a la pantalla de cambio de clave
   *
   * @memberof AvatarComponent
   */
  changePassword() {
    this.router.navigateByUrl('/authentication/resetpassword');
  }

  /**
   * Bloquea la sesion y redirecciona a la pantalla de bloqueo
   *
   * @memberof AvatarComponent
   */
  lockSesion() {
    sessionStorage.setItem('locksesion', '1');
    this.router.navigateByUrl('/authentication/locksesion');
  }

  /**
   * Cierra la sesion del usuario
   *
   * @memberof AvatarComponent
   */
  logout() {
    this.access_service.logout_banana().subscribe(
      result => {
        let body: any = result;
        if (body.result == 1) {
          sessionStorage.clear();
          // localStorage.removeItem('settings');
          this.router.navigateByUrl('/authentication/login');
        }
      },
      msg => {
        if (msg.status == 406) {
          tokenUtil(this.router);
        }
        notifyManage(msg);
      }
    );
  }

}
