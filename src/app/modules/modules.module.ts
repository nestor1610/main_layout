import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    ModulesRoutingModule,
    CoreModule,
    SharedModule
  ],
})
export class ModulesModule { }
