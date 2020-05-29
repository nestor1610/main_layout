import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const routes = [
  {
    path: '',
    redirectTo: 'main'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
