import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlAccess } from '../../utils/controlAccess';
import { InternationalizationUtil } from '../../utils/internationalizationUtil';

@Component({
  selector: 'app-email-credentials-form',
  templateUrl: './email-credentials-form.component.html',
  styleUrls: ['./email-credentials-form.component.scss']
})
export class EmailCredentialsFormComponent implements OnInit {
  @Input() access: ControlAccess;
  @Input() table: number;
  @Input() model: any = {};
  @Input() read_only: boolean = false;
  @Input() type_view: number = 0;
  @Input() properties_id: any = {};
  @Input() lbl: InternationalizationUtil;
  @Input() with_button: boolean = false;
  @Output() clickButtonEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getIdColumnByProperty (property: string) {
    // Retorna el valor de la propiedad o -1
    return this.properties_id.hasOwnProperty(property) ? this.properties_id[property] : -1;
  }

  clickButton () {
    this.clickButtonEvent.emit(this.model);
  }

}
