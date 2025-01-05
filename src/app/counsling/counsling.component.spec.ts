import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounslingComponent } from './counsling.component';

describe('CounslingComponent', () => {
  let component: CounslingComponent;
  let fixture: ComponentFixture<CounslingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounslingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounslingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
