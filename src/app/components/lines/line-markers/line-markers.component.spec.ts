import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMarkersComponent } from './line-markers.component';

describe('LineMarkersComponent', () => {
  let component: LineMarkersComponent;
  let fixture: ComponentFixture<LineMarkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMarkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
