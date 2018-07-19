/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TemperatureChartComponent } from './temperature-chart.component';

describe('TemperatureChartComponent', () => {
  let component: TemperatureChartComponent;
  let fixture: ComponentFixture<TemperatureChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
