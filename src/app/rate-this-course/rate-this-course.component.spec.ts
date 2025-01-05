import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateThisCourseComponent } from './rate-this-course.component';

describe('RateThisCourseComponent', () => {
  let component: RateThisCourseComponent;
  let fixture: ComponentFixture<RateThisCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateThisCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateThisCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
