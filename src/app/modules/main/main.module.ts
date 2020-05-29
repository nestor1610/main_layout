import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    
  ],
  providers: [
    
  ]
})
export class MainModule {

  isMenuOpen: boolean = true;

  onToolbarMenuToggle() {
    console.log('On Toolbar Toogle', this.isMenuOpen);
    this.isMenuOpen=!this.isMenuOpen;
  }




 }
