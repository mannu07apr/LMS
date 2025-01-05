import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershiphomeComponent } from './membershiphome.component';

describe('MembershiphomeComponent', () => {
  let component: MembershiphomeComponent;
  let fixture: ComponentFixture<MembershiphomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembershiphomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershiphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
