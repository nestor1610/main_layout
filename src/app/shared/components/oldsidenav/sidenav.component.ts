import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EventLaunchService } from 'src/app/core/services/event-launch/event-launch.service';
// import { ContentComponent } from '../content/content.component';
import { onMainContentChange } from './animations/animations';

@Component({
  selector: 'app-oldsidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  /* Animaciones */
  animations: [onMainContentChange]
})
export class OldSidenavComponent implements OnInit {
  // Propiedad dedicada a tener el valor de ContentComponent que se encuentra en el template
  // @ViewChild(ContentComponent) app_content: ContentComponent;
  @Input() elementsNav: any;
  onSideNavChange: boolean;
  linkText: boolean = false;

  constructor(private _EventLaunchService: EventLaunchService) {
  }

  ngOnInit(): void {
    // Se hace el llamado a la funcion cuando carga el componente
    this.subscribeNavItems();
  }

  /**
   * Cambia el valor de onSideNavChange cada vez que se abre o cierra el menu
   *
   * @memberof OldSidenavComponent
   */
  onSinenavToggle() {
    this.onSideNavChange = !this.onSideNavChange;

    setTimeout(() => {
      this.linkText = this.onSideNavChange;
    }, 200);

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

  /**
   * Obtiene el elemento enviado por la suscripcion y carga un elemento mediante al metodo de AppContent
   *
   * @param {*} item
   * @memberof SideNavComponent
   */
  chargeContent(item) {
    // this.app_content.evaluateItemToCharge(item);
  }
}

