import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionApplicatifComponent } from './connexion-applicatif.component';

describe('ConnexionApplicatifComponent', () => {
  let component: ConnexionApplicatifComponent;
  let fixture: ComponentFixture<ConnexionApplicatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionApplicatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionApplicatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
