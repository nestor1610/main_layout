import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventLaunchService } from 'src/app/core/services/event-launch/event-launch.service';
import { GradientConfig } from './app-config';
// import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // Componente content
  // @ViewChild(ContentComponent) app_content: ContentComponent;
  // Propiedad en donde se almacenaran los elementos del nav content
  @Input() public elementsNav: any;
  public gradientConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor(private _EventLaunchService: EventLaunchService) {
    this.gradientConfig = GradientConfig.config;
    this.navCollapsed = true;
    this.navCollapsedMob = false;
    this.windowWidth = window.innerWidth;
  }

  /**
   * Obtiene el elemento enviado por la suscripcion y carga un elemento mediante al metodo de AppContent
   *
   * @param {*} item
   * @memberof SideNavComponent
   */
  chargeContent (item) {
    // this.app_content.evaluateItemToCharge(item);
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  ngOnInit(): void {
    this.subscribeNavItems();
  }

  /**
   * Se suscribe a los eventos navElementEvent. Esta destinado a capturar todo lo emitido dentro de sidenav
   *
   * @memberof SideNavComponent
   */
  subscribeNavItems() {
    this._EventLaunchService.navElementEvent.subscribe((data) => {
      this.chargeContent(data);
    });
  }

}
