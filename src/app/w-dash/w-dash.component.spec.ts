import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WDashComponent } from './w-dash.component';

describe('WDashComponent', () => {
  let component: WDashComponent;
  let fixture: ComponentFixture<WDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
