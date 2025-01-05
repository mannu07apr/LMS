import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcrationComponent } from './imgcration.component';

describe('ImgcrationComponent', () => {
  let component: ImgcrationComponent;
  let fixture: ComponentFixture<ImgcrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgcrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgcrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
