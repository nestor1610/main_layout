import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocksesionComponent } from './locksesion.component';

describe('LocksesionComponent', () => {
  let component: LocksesionComponent;
  let fixture: ComponentFixture<LocksesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocksesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocksesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
