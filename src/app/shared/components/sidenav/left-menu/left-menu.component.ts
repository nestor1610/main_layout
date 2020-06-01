import { Component, Input, OnInit } from '@angular/core';
import { EventLaunchService } from 'src/app/core/services/event-launch/event-launch.service';
import { animateText, onSideNavChange } from '../animations/animations';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  /* Animaciones. Estas se encuentran en la carpeta ./animations */
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {
  @Input() sideNavState: boolean = false;
  @Input() linkText: boolean = false;
  // Elementos del left menu
  @Input() elements: Array<any> /* = [
    { id: null, type: 'item', title: 'Inbox', url: '/some-link', icon: 'inbox' },
    { id: null, type: 'item', title: 'Starred', url: '/some-link', icon: 'star' },
    { id: null, type: 'item', title: 'Send email', url: '/some-link', icon: 'send' }
  ] */;

  constructor(private _EventLaunchService: EventLaunchService) { }

  ngOnInit() {
  }

  /**
   * Cuando un elemento del menu es clickeado se emite un evento gracias a una propiedad del servicio
   *
   * @param {*} item
   * @memberof LeftMenuComponent
   */
  emitNavItem(item) {
    this._EventLaunchService.navElementEvent.emit(item);
  }

}