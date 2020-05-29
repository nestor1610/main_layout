// declare var $: any;
export function AuthBanana(_router) {

  if (sessionStorage.getItem('isLogged') === null || sessionStorage.getItem('isLogged') !== 'true') {

    _router.navigate(['/authentication/login']);
    return false;

  } else if (parseInt(sessionStorage.getItem('temporary_password'))) {

    _router.navigate(['/authentication/resetpassword']);

  } else if (sessionStorage.getItem('locksesion') != null) {

    _router.navigate(['/authentication/locksesion']);

  } else {
    return true;
  }

}