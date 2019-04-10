import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlhostComponent } from './sqlhost.component';

describe('SqlhostComponent', () => {
  let component: SqlhostComponent;
  let fixture: ComponentFixture<SqlhostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlhostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
