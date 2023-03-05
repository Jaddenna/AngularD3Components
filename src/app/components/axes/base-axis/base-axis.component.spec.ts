import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAxisComponent } from './base-axis.component';

describe('BaseAxisComponent', () => {
  let component: BaseAxisComponent;
  let fixture: ComponentFixture<BaseAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
