import {
  Component,
  Input,
  forwardRef,
  AfterViewInit,
  OnChanges,
  ViewChild,
  ElementRef } from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl } from '@angular/forms';

import { isUrl } from '../../utils/string';

import {BananaConstants } from '../../../core/config/constants';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ],
})
export class FileUploadComponent implements ControlValueAccessor, AfterViewInit, OnChanges {

  // ID attribute for the field and for attribute for the label
  @Input()  idd = '';

  // The field name text . used to set placeholder also if no pH (placeholder) input is given
  @Input()  text = '';

  // placeholder input
  @Input() pH: string;

  // set true if we need not show the asterisk in red color
  @Input() optional: boolean;

  @Input() accept?: string;

  @Input() type?: string;

  @Input() icon?: string;

  @Input() message?: string;

  // errors for the form control will be stored in this array
  errors: Array<any> = ['This field is required'];

  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild('pictureImg') pictureImg: ElementRef;

  private innerValue: any = '';

  private defaultValue?: any = undefined;

  public hasPreview: boolean;


  public profiles = {
    image: {
      types: ['image/gif', 'image/jpeg', 'image/png'],
      exts: ['gif', 'png', 'jpg', 'jpeg'],
      icon: 'fa fa-image',
      message: 'arrastre una imagen o haga clic aquí'
    },
    default: {
      types: ['*'],
      icon: 'fa fa-file',
      message: 'arrastre un archivo o haga clic aquí'
    }
  };

  constructor() { }

  ngAfterViewInit() { }

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  get fileMessage(): string {
    if (this.message && this.message.length > 0) {
      return this.message;
    }
    if (this.type && (this.type) in this.profiles) {
      return this.profiles[this.type].message;
    }
    return this.profiles.default.message;
  }

  get fileIcon(): string {
    if (this.icon && this.icon.length > 0) {
      return this.icon;
    }
    if (this.type && (this.type) in this.profiles) {
      return this.profiles[this.type].icon;
    }
    return this.profiles.default.icon;
  }

  get fileTypes(): string {
    if (this.accept && this.accept.length > 0) {
      return this.accept;
    }
    if (this.type && (this.type) in this.profiles) {
      return this.profiles[this.type].types.join(',');
    }
    return this.profiles.default.types.join(',');
  }

  restore() {
    this.value = this.defaultValue;
  }

  preview() {
    if (this.value === null || !this.isImage(this.value)) {
      this.hasPreview = false;
      return;
    }
    const img = this.pictureImg.nativeElement;
    const reader = new FileReader();
    reader.onload = (e: any) => img.src = e.target.result;
    reader.readAsDataURL(this.value);
    this.hasPreview = true;
  }


  isImage(file?: any) {
    if (file === undefined) {
      file = this.value;
    }
    if (!(file instanceof File)) {
      return false;
    }
    if (file.type && file.type.trim().length > 0) {
      return this.profiles.image.types.includes(file.type);
    }
    if (file.name && file.name.trim().length > 0) {
      const ext = file.name.trim().split('.').pop().toLowerCase();
      return this.profiles.image.exts.includes(ext);
    }
  }

  protected previewFromFile(file: File) {
    if (!this.isImage(file)) {
      this.hasPreview = false;
      return;
    }
    const img = this.pictureImg.nativeElement;
    const reader = new FileReader();
    reader.onload = (e: any) => img.src = e.target.result;
    reader.readAsDataURL(file);
    this.hasPreview = true;
  }


  onFileChange(event: any) {
    let file: File|null = null;
    if (event.target.files.length > 0) {
      file = event.target.files[0];
    }
    this.value = file;
  }

  ngOnChanges() { }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v === this.innerValue) {
      return;
    }
    if (typeof v === 'string') {
      v = `${BananaConstants.urlServer}${v}`;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = null;
      xhr.open('get', v);
      xhr.responseType = 'blob';
      xhr.onload = () => this.value = new File([xhr.response], v.split('/').pop());
      xhr.onerror = () => this.value = null;
      xhr.send();
      return;
    }
    if (this.defaultValue === undefined) {
      this.defaultValue = v;
    }
    this.innerValue = v;
    this.preview();
    this.onChange(this.value);
    this.onTouched();
  }

  onChange = (_: any) => null;

  onTouched = () => null;

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
