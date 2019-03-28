import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuillComponent } from './page-acceuill.component';

describe('PageAcceuillComponent', () => {
  let component: PageAcceuillComponent;
  let fixture: ComponentFixture<PageAcceuillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAcceuillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAcceuillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
