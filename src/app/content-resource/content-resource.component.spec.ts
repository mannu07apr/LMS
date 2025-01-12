import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentResourceComponent } from './content-resource.component';

describe('ContentResourceComponent', () => {
  let component: ContentResourceComponent;
  let fixture: ComponentFixture<ContentResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentResourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
