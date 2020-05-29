export function clearStorage () {
  const user_password = localStorage.getItem('userAndPass');
  localStorage.clear();
  localStorage.setItem('userAndPass', user_password);
}