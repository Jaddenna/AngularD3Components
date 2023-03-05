import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAxisComponent } from './top-axis.component';

describe('TopAxisComponent', () => {
  let component: TopAxisComponent;
  let fixture: ComponentFixture<TopAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
