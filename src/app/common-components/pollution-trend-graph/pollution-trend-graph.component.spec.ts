import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionTrendGraphComponent } from './pollution-trend-graph.component';

describe('PollutionTrendGraphComponent', () => {
  let component: PollutionTrendGraphComponent;
  let fixture: ComponentFixture<PollutionTrendGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollutionTrendGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionTrendGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
