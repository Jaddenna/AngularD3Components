import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAxisComponent } from './left-axis.component';

describe('LeftAxisComponent', () => {
  let component: LeftAxisComponent;
  let fixture: ComponentFixture<LeftAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftAxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
