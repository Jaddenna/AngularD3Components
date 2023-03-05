import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomAxisComponent } from './bottom-axis.component';

describe('BottomAxisComponent', () => {
  let component: BottomAxisComponent;
  let fixture: ComponentFixture<BottomAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomAxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
