import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    HttpClientModule,
    LandingRoutingModule,
  ],
  providers: [
  ],
  declarations: [LandingComponent, HeaderComponent, BodyComponent, FooterComponent]
})
export class LandingModule { }
