import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getElementOfSelect } from '../../utils/select2Util';

/**
 * input Select de material para su uso en todos los formularios
 *
 * @export
 * @class MatSelectComponent
 * @implements {OnInit}
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'app-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatSelectComponent),
    multi: true
  }]
})
export class MatSelectComponent implements OnInit, ControlValueAccessor {
  // Opciones del select propiedad unica, 'id'
  @Input() options: Array<any> = [];
  // Label de la opcion, por defecto 'text'
  @Input() key: string = 'text';
  // Si las opciones tienen hijos
  @Input() children: boolean = false;
  @Input() key_children: string = 'children';
  // Si son opciones multiples
  @Input() multiple: boolean = false;
  // Si es requerido
  @Input() required: boolean = false;
  // Placeholder o label
  @Input() placeholder: string = '';
  // Deshabilitado
  @Input() disabled: boolean = false;
  // Si solo se mostraran los hijos de terminados de una opcion
  @Input() show_only_this: boolean = false;
  // Id del padre del cual se mostraran solo sus hijos
  @Input() parent_id: any = null;
  // Evento de salida
  @Output() onSelect = new EventEmitter<any>();
  value: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Metodo que emite la opcion seleccionada en el select
   *
   * @param {*} [value=null]
   * @memberof MatSelectComponent
   */
  _emitOption (value = null) {
    let option = null;

    if (value == null)
      option = getElementOfSelect(this.options, this.value);
    else
      option = value

    this.onSelect.emit(option);
  }

  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => {};

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => { };

  /**
   * Method that is invoked on an update of a model.
   */
  updateChanges() {
    this.onChange(this.value);
  }

  ///////////////
  // OVERRIDES //
  ///////////////

  /**
   * Writes a new item to the element.
   * @param value the value
   */
  writeValue(value: number): void {
    this.value = value;
    this.updateChanges();
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
