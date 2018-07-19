/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemperatureDataService } from '../../dashboard/temperature-data/temperature-data.service';

describe('TemperatureDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureDataService]
    });
  });

  it('should ...', inject([TemperatureDataService], (service: TemperatureDataService) => {
    expect(service).toBeTruthy();
  }));
});
