import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightAxisComponent } from './right-axis.component';

describe('RightAxisComponent', () => {
  let component: RightAxisComponent;
  let fixture: ComponentFixture<RightAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightAxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
