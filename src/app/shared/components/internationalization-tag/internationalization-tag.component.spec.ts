import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalizationTagComponent } from './internationalization-tag.component';

describe('InternationalizationTagComponent', () => {
  let component: InternationalizationTagComponent;
  let fixture: ComponentFixture<InternationalizationTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalizationTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalizationTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
