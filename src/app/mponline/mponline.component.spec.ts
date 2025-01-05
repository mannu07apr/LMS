import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MponlineComponent } from './mponline.component';

describe('MponlineComponent', () => {
  let component: MponlineComponent;
  let fixture: ComponentFixture<MponlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MponlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MponlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
