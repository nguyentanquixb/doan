import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessHotelComponent } from './assess-hotel.component';

describe('AssessHotelComponent', () => {
  let component: AssessHotelComponent;
  let fixture: ComponentFixture<AssessHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
