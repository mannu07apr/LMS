import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponentComponent } from './progress-bar-component.component';

describe('ProgressBarComponentComponent', () => {
  let component: ProgressBarComponentComponent;
  let fixture: ComponentFixture<ProgressBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
