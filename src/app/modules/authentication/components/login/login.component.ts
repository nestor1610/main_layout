import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { BananaConstants } from '../../../../core/config/constants';
import { AccessService } from '../../../../core/services/access/access.service';
import { validateProperties } from '../../../../shared/utils/bananaValidate';
import { clearStorage } from '../../../../shared/utils/clearStorage';
// import { BananaHeader } from '../../core/config/header';
import { InternationalizationUtil } from '../../../../shared/utils/internationalizationUtil';
import { notifyManage, showNotification } from '../../../../shared/utils/notifyUtil';
import { SigninService } from 'src/app/core/services/signin/signin.service';


declare var $: any;
declare var Pusher: any;
var theMask = function () {
  let myArray: any[] = [];
  for (let index = 0; index < 255; index++) {
    myArray[index] = /[a-zA-Z0-9]/;
  }
  return myArray;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hide = false;
  mask = theMask;
  user: any = {};
  workspace: string = '';
  remember: boolean = false;
  loading = false;
  is_log = true;
  lbl: InternationalizationUtil = new InternationalizationUtil(this.http, 0);

  workspace_selected = false;


  constructor(
    public http: HttpClient,
    public router: Router,
    private access_service: AccessService,
    public _SigninService: SigninService
  ) { }

  ngOnInit() {
    // this.lbl.moduleVerificTags();
    // this.pusher()
    this.verifyDomain();

    /* Si existe el token en la sesion, redirecciona a la App */
    if (sessionStorage.getItem('user_token') == null) {
      this.is_log = false;
    } else {
      this.router.navigateByUrl('/app/main');
    }

    this.getUserLoggedIn();
  }

  verifyDomain() {
    let count: number = location.hostname.split('.').length;

    if (count == 3) {
      this.workspace = location.hostname.split('.')[0];
      this.workspace_selected = true;
    }
  }

  /**
   * Valida que haya un email y un password
   *
   * @returns
   * @memberof LoginComponent
   */
  validateLogin() {
    let flag = true;
    let body: any = {
      email: this.user.email,
      password: this.user.password,
      workspace: this.workspace
    };
    let validate = validateProperties(body);

    if (!validate.validate) {
      showNotification(validate.property + ' es requerido', 4);
      flag = false;
    }

    return flag;
  }

  /**
   * Evalua si el usuario quiere ser recordado para el proximo inicio de sesion
   *
   * @memberof LoginComponent
   */
  checkbox() {
    let object: any = {};
    object.email = this.user.email;
    object.password = this.user.password;
    object.workspace = this.workspace;

    if (this.remember) {
      localStorage.setItem('userAndPass', JSON.stringify(object));
    }
    else
      localStorage.removeItem('userAndPass');
  }

  /**
   * Si hay credenciales en local Storage, estas setearan el email y password del formulario
   *
   * @memberof LoginComponent
   */
  getUserLoggedIn() {
    let user_local: any = localStorage.getItem('userAndPass');

    if (user_local != null) {
      user_local = JSON.parse(localStorage.getItem('userAndPass'));


      this.user.email = user_local.email;
      this.user.password = user_local.password;
      this.workspace = user_local.workspace;
      this.workspace_selected = true;
      this.remember = true;
    }

  }

  /**
   * Hace el llamado del metodo para validar las credenciales
   * Si es valido, hace el llamado del metodo para la peticion Login
   *
   * @returns
   * @memberof LoginComponent
   */
  login() {
    if (!this.validateLogin()) return;
    this.getCredential(this.user.email, this.user.password)
  }

  /**
   * Recibe email y password para hacer la peticion de Login
   * Este metodo encripta el password antes de ser enviado
   * De ser las credenciales correctas, se redirecciona a la app
   *
   * @param {string} userEmail
   * @param {string} userPass
   * @memberof LoginComponent
   */
  getCredential(userEmail: string, userPass: string): void {
    let dns: string;

    this.checkbox();

    if (this.workspace == '') {
      dns = BananaConstants.protocol + BananaConstants.domain;
    } else {
      dns = BananaConstants.protocol + this.workspace + '.' + BananaConstants.domain;
    }

    this.loading = true;
    const headers = new HttpHeaders().set('authorization', dns)
      .set('app', 'BananaCli');
    const md5 = new Md5();
    const body = {
      email: userEmail,
      password: md5.appendStr(userPass).end()
    };
    const options = {
      headers: headers
    };
    this.access_service.login(body, options).subscribe(
      (result: any) => {
        const user: any = result.user.user[0];
        const settings: any = result.user.settings;
        const third_id: any = result.user.third_id;
        const contact: any = result.user.user[0].contact;
        const last_login: any = result.user.last_login;


        if (this.workspace != '')
          this.saveInSession('workspace', this.workspace);

        /* Se guarda en la sesion las credenciales y cierta informacion del usuario */
        this.saveInSession('isLogged', true);
        this.saveInSession('temporary_password', (user.temporary_password) ? 1 : 0);
        this.saveInSession('user_id', user.id);
        this.saveInSession('third_id', third_id);
        this.saveInSession('last_login', last_login);
        this.saveInSession('user_email', userEmail);
        this.saveInSession('user_password', user.password);
        this.saveInSession('user_email', user.email);
        this.saveInSession('user_token', user.remember_token);
        this.saveInSession('contact_name', user.contact.name);
        this.saveInSession('contact_charge', user.contact.charge_name);
        this.saveInSession('image_name', user.image_name);
        this.saveInSession('user', JSON.stringify(user));
        this.saveInSession('contact', JSON.stringify(contact));

        /*
          Verifica la configuracion anterior
          Si el lenguaje cambio, limpia el local storage
        */
        let old: any = JSON.parse(localStorage.getItem('settings_configuration'));
        if (old != null)
          if (old.language_id != settings.configuration.language_id) clearStorage();

        this.saveSettingsInLocal(settings);

        if (user.temporary_password)
          this.router.navigateByUrl('/authentication/resetpassword');
        else
          this.router.navigateByUrl('/app/main');

      },
      msg => {
        this.loading = false;
        notifyManage(msg);
      }
    );
  }

  /**
   * Guarda en el local storage cada una de las configuracion de los modulos del cliente
   *
   * @param {*} settings
   * @memberof LoginComponent
   */
  saveSettingsInLocal(settings: any) {
    Object.keys(settings).forEach(function (key) {
      if (settings[key] != null && settings[key] !== undefined) localStorage.setItem('settings_' + key, JSON.stringify(settings[key]));
    });
  }

  /* getElements(): void {

    let body: any = {};
    this.loading = true;
    const params = {

      idLang : 2

    };

    this.http.get(BananaConstants.urlServer + 'api/internationalization/getAllTagSystem',
     BananaHeader(params)).toPromise().then(
            result => {
              console.log(result)
              body =  result;
              let tags = body.tags;

              tags.forEach(element => {
                this.saveInLocal('tag_' + element.key,element.value);
              });

               $('.modal-backdrop').remove();
            },
            msg => {
              this.loading = false;
               $('.modal-backdrop').remove();
              notifyManage(msg);
          });
    } */

  /**
   * Almacena en el local storage mediante una llave y un valor
   *
   * @param {*} key
   * @param {*} val
   * @memberof LoginComponent
   */
  saveInSession(key, val): void {
    sessionStorage.setItem(key, val);
  }

  saveInLocal(key, val): void {
    localStorage.setItem(key, val);
  }



  getFromLocal(key): void {
    // console.log('recieved= key:' + key);
    // this.data[key] = this.storage.get(key);
    // console.log(this.data);
  }

  pusher() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('f1df92f9e5205ac1df20', {
      cluster: 'us2',
      forceTLS: true
    });

    const channel = pusher.subscribe('status-liked');
    channel.bind('App\\Events\\StatusLiked', function (data) {
      alert(JSON.stringify(data));
    });

  }

  validateDns() {
    this.workspace_selected = false;
    this._SigninService.searchDnsAvailable(this.workspace).subscribe(result => {

      if (result == null) {
        this.workspace_selected = false;
        showNotification('Subdominio no esta disponible', 4);
      } else {
        this.workspace_selected = true;
      }
    }, error => { });
  }

}


