import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnsnameOraComponent } from './tnsname-ora.component';

describe('TnsnameOraComponent', () => {
  let component: TnsnameOraComponent;
  let fixture: ComponentFixture<TnsnameOraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnsnameOraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnsnameOraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
