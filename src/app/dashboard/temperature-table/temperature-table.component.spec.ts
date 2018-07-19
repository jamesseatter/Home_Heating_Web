/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TemperatureTableComponent } from './temperature-table.component';

describe('TemperatureTableComponent', () => {
  let component: TemperatureTableComponent;
  let fixture: ComponentFixture<TemperatureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
