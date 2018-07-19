/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TemperatureGaugeComponent } from './temperature-gauge.component';

describe('TemperatureGaugeComponent', () => {
  let component: TemperatureGaugeComponent;
  let fixture: ComponentFixture<TemperatureGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
