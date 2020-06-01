import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  elementsNav: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.elementsNav = [
      // Elementos tipo link
      { id: null, type: 'item', title: 'Inbox', url: '/some-link', icon: 'inbox' },
      { id: null, type: 'item', title: 'Starred', url: '/some-link', icon: 'star' },
      // Elemento tipo titulo
      { id: null, type: 'title', title: 'Titulo a mostra. No debe ser clickeable', url: 'El link es inutil en este tipo', icon: 'send' },
      // Elemento tipo separador
      { id: null, type: 'separator', title: 'Linea separadora', url: 'El link es inutil en este tipo', icon: 'send' },
      // Elemento tipo collapse. Contenedor de otros elementos
      {
        id: null, type: 'collapse', title: 'Elemento del menu con otros elementos dentro', url: 'El link es inutil en este tipo', icon: 'send', childrens: [
          // Elementos tipo link
          { id: null, type: 'item', title: 'Hijo 1', url: '/some-link', icon: 'inbox' },
          { id: null, type: 'item', title: 'Hijo 2', url: '/some-link', icon: 'star' },
          // Elemento tipo collapse. Contenedor de otros elementos
          {
            id: null, type: 'collapse', title: 'Hijo 3', url: 'El link es inutil en este tipo', icon: 'send', childrens: [
              // Elementos tipo link
              { id: null, type: 'item', title: 'Hijo 1', url: '/some-link', icon: 'inbox' },
              { id: null, type: 'item', title: 'Hijo 2', url: '/some-link', icon: 'star' },
              // Elemento tipo collapse. Contenedor de otros elementos
              {
                id: null, type: 'collapse', title: 'Hijo 3', url: 'El link es inutil en este tipo', icon: 'send', childrens: [
                  // Elementos tipo link
                  { id: null, type: 'item', title: 'Hijo 1', url: '/some-link', icon: 'inbox' },
                  { id: null, type: 'item', title: 'Hijo 2', url: '/some-link', icon: 'star' },
                ]
              }
            ]
          }
        ]
      }
    ];
  }

}
