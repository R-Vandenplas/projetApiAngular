import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewemployeComponent } from './newemploye.component';

describe('NewemployeComponent', () => {
  let component: NewemployeComponent;
  let fixture: ComponentFixture<NewemployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewemployeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewemployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
