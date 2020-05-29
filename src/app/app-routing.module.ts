import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const routes = [
  {
    path: '',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'miscellaneous',
    loadChildren: () => import('./modules/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
