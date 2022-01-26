import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristDestinationDetailComponent } from './tourist-destination-detail.component';

describe('TouristDestinationDetailComponent', () => {
  let component: TouristDestinationDetailComponent;
  let fixture: ComponentFixture<TouristDestinationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristDestinationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristDestinationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
