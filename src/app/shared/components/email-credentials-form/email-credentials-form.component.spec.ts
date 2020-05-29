import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCredentialsFormComponent } from './email-credentials-form.component';

describe('EmailCredentialsFormComponent', () => {
  let component: EmailCredentialsFormComponent;
  let fixture: ComponentFixture<EmailCredentialsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCredentialsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCredentialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
