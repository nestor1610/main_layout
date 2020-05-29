import { Component, OnInit } from '@angular/core';
import { NavigationItem } from 'src/app/shared/components/sidenav/navigation/navigation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  elementsNav: Array<any>;

  constructor(public nav: NavigationItem) { }

  ngOnInit(): void {
    this.elementsNav = [
      { id: null, type: 'item', title: 'Inbox', url: '/some-link', icon: 'inbox' },
      { id: null, type: 'item', title: 'Starred', url: '/some-link', icon: 'star' },
      { id: null, type: 'item', title: 'Send email', url: '/some-link', icon: 'send' }
    ];
  }

}
