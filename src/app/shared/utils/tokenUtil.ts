export function tokenUtil(_router) {
  window.stop();
  document.close();
  sessionStorage.clear();
  _router.navigate(['/authentication/login']);

}
