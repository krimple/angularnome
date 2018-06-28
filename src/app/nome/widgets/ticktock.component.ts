import { Component, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tick-tock',
  template: `
    <ngx-charts-gauge
      [results] = "single"
      [view] = "view"
      [scheme] = "colorScheme"
      [min]="0"
      [max]="128"
      [legend] = "true"
      [angleSpan] = "240"
      [startAngle] = "-120"
      [units]="'cycle'"
      [bigSegments] = "10"
      [smallSegments] = "5">
    </ngx-charts-gauge>
  `
})
export class TickTockComponent implements OnChanges {

  @Input() timeData: any;

    single = [
      { 'name': 'measure', 'value' : 123 },
      { 'name': 'quarter', 'value' : 12 },
      { 'name': 'eighth', 'value' : 60 },
      { 'name': 'sixteenth', 'value' : 90 }
    ];

  view = [400, 400];

  colorScheme = {
    domain: ['#000000', '#00AA00', '#0000AA', '#AAAAAA']
  };

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.timeData && simpleChanges.timeData.currentValue !== undefined) {
      const timeData = simpleChanges.timeData.currentValue;
      this.single = [
          { ...this.single[0], value: timeData.measure },
          { ...this.single[1], value: timeData.quarter * 32},
          { ...this.single[2], value: timeData.eighth * 16},
          { ...this.single[3], value: timeData.sixteenth * 8 },
      ];
    }

  }

}
