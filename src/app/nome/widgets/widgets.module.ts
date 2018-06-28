import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TickTockComponent } from './ticktock.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [
    TickTockComponent
  ],
  exports: [
    TickTockComponent
  ]
})
export class WidgetsModule { }
