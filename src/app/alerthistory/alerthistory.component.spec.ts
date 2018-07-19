/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlerthistoryComponent } from './alerthistory.component';

describe('AlerthistoryComponent', () => {
  let component: AlerthistoryComponent;
  let fixture: ComponentFixture<AlerthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
