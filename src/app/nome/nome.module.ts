import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetronomeService } from './metronome-service';
import { TickTockComponent } from './widgets/ticktock.component';
import { WidgetsModule } from './widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule
  ],
  exports: [
    TickTockComponent
  ],
  providers: [
    MetronomeService
  ]
})
export class NomeModule { }
