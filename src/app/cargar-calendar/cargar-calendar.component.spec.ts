import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCalendarComponent } from './cargar-calendar.component';

describe('CargarCalendarComponent', () => {
  let component: CargarCalendarComponent;
  let fixture: ComponentFixture<CargarCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
