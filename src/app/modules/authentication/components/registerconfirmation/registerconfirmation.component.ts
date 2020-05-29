import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/locations/location.service';
import { SigninService } from 'src/app/core/services/signin/signin.service';
import { showNotification } from 'src/app/shared/utils/notifyUtil';

class ConfirmationRegister {
  use_banana_server = true;
  first_name = '';
  last_name = '';
  email = '';
  company_name = '';
  address = '';
  country_id: number = null;
  state_id: number = null;
  city_id: number = null;
  postal = '';
  phone = '';
  workspace = '';
  url_database = '';
  user_database = '';
  password_database = '';
}

@Component({
  selector: 'app-registerconfirmation',
  templateUrl: './registerconfirmation.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterConfirmationComponent implements OnInit {
  prospect = new ConfirmationRegister();
  messageWebService = '';
  token: string = null;
  validate_dns: boolean = true;
  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];


  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private signinService: SigninService,
    private location_service: LocationService
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.params.token;

    if (this.token == null) {
      this._router.navigate(['/miscellaneous/error404']);
    } else {
      this.validateTokenEmail();
      this.getCountries();
    }

    this.socket();
  }

  validateDns() {
    this.signinService.searchDnsAvailable(this.prospect.workspace).subscribe((result: any) => {

      if (result == null) {
        this.validate_dns = false;
      } else {
        this.validate_dns = true;
        showNotification('Subdominio no esta disponible', 4);
      }
    }, error => { });
  }

  validateTokenEmail() {

    this.signinService.validateTokenEmail(this.token).subscribe(
      (result: any) => {
        const response = result.result;

        this.prospect.first_name = response.first_name;
        this.prospect.last_name = response.last_name;
        this.prospect.email = response.email;

        if (result.result.expired == 1) {
          this._router.navigate(['/miscellaneous/error404']);
        }
      },
      msg => {
        this._router.navigate(['/miscellaneous/error404']);
      }
    );
  }

  validateConection() {
    const conection = {
      url_database: this.prospect.url_database,
      user_database: this.prospect.user_database,
      password_database: this.prospect.password_database
    };
    this.signinService.testConection(conection).subscribe(
      (result: any) => {
        showNotification('Conexion es valida', 1);
      },
      (error) => {
        showNotification('Ocurrio un error', 4);
      });
  }

  get dataBaseNotNull() {
    return !(
      this.prospect.url_database.trim() !== '' &&
      this.prospect.user_database.trim() !== '' &&
      this.prospect.password_database.trim() !== ''
    );
  }

  get prospectNotNull() {
    return !(
      this.prospect.first_name.trim() !== '' &&
      this.prospect.last_name.trim() !== '' &&
      this.prospect.email.trim() !== '' &&
      this.prospect.company_name.trim() !== '' &&
      this.prospect.address.trim() !== '' &&
      this.prospect.country_id !== undefined &&
      this.prospect.state_id !== undefined &&
      this.prospect.city_id !== undefined &&
      this.prospect.phone.trim() !== '' &&
      this.prospect.workspace.trim() !== '' &&
      !this.validate_dns
    );
  }

  generateBD() {
    this.signinService.generateBD(this.prospect).subscribe(
      (result: any) => {
        window.location.replace('https://' + this.prospect.workspace + '.bananaproweb.com/authentication/login');
      },
      msg => {

      }
    );
  }

  socket() {
    this.signinService.getMessages().subscribe((result: any) => {
      // this.messages.push(message);
      console.log(JSON.parse(result));
      let message = JSON.parse(result);
      if (message.tipo == 'notificacion') {
        showNotification(message.mensaje);
      } else if (message.tipo == 'process') {
        this.messageWebService = message.mensaje;
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }

  getCountries() {
    this.location_service.getCountries().toPromise().then(
      (result: any) => {
        this.countries = result.countries;
      },
      msg => {
      }
    );
  }

  getStates(country_id) {
    if (country_id == null) return;

    this.prospect.state_id = null;
    this.prospect.city_id = null;

    this.states = [];
    this.cities = [];
    this.location_service.getStates(country_id).toPromise().then(
      (result: any) => {
        this.states = result.states;
      },
      msg => {
      }
    );
  }

  getCities(state_id) {
    if (state_id == null) return;

    this.prospect.city_id = null;
    this.cities = [];
    this.location_service.getCities(state_id).toPromise().then(
      (result: any) => {
        let body: any = result;
        this.cities = result.cities;
      },
      msg => {
      }
    );
  }
}
