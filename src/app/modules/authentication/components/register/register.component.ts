import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/core/services/signin/signin.service';
import { showNotification } from 'src/app/shared/utils/notifyUtil';

class Register {
  first_name = '';
  last_name = '';
  email = '';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']

})
export class RegisterComponent implements OnInit {
  register: Register = new Register();

  constructor(public signinService: SigninService) { }

  ngOnInit(): void {
  }

  get NotNull() {
    return !(this.register.email.trim() !== '' && this.register.first_name.trim() !== '' && this.register.last_name.trim() !== '');
  }

  validateEmail() {
    this.signinService.validateEmail(this.register).subscribe(
      (result: any) => {
        if (result) {
          showNotification('Se le ha enviado un correo. Por favor, revise su email', 2, 'No olvide revisar la carpeta SPAM', true);
        } else {
          showNotification('Ya existe un usuario con este correo', 4);
        }
      },
      msg => {
        showNotification('Ocurrio un error', 4);
      }
    );

  }

}
