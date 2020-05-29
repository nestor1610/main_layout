import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.modules';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    MiscellaneousRoutingModule

  ]
})
export class MiscellaneousModule { }



