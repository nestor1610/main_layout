import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { showNotification } from 'src/app/shared/utils/notifyUtil';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private user_service: UsersService) {}

  ngOnInit(): void {
  }

  sendEmail () {
    this.user_service.resetPassword(this.email).toPromise().then(
      (result: any) => {
        if ( result.result === 1 ) {
          showNotification('Se le ha enviado un correo. Por favor, revise su email', 2, 'No olvide revisar la carpeta SPAM', true);
        } else {
          showNotification('No existe un usuario con el email proporcionado', 4, 'Por favor, revise el email e intentelo de nuevo');
        }
      },
      msg => {
      }
    );
  }

  get validateEmail() {
    return !(this.email.trim() !== '');
  }

}
