import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MetronomeService } from './nome/metronome-service';

@Component({
  selector: 'app-root',
  template: `
  <form [formGroup] = 'tempoFormGroup'>
    <label for="bpm">Tempo</label>
    <input
      name="bpm"
      #bpm
      min="10"
      max="128"
      formControlName="bpm"
      type="range"  /> {{ bpm.value }}
    <pre>{{ timeData | json }}</pre>
  </form>
  <app-tick-tock [timeData]="timeData"></app-tick-tock>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subscription: Subscription;
  heartBeat$: Observable<number>;
  timeData: any;
  tempoFormGroup: FormGroup;

  constructor(
    private metronomeService: MetronomeService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.tempoFormGroup = this.fb.group({
      'bpm': [60]
    });
    this.heartBeat$ = this.metronomeService.heartBeat$;
    this.metronomeService.setBPM(40);
    this.subscription = this.heartBeat$.subscribe(
      data => this.timeData = data);
    this.tempoFormGroup.valueChanges.subscribe((updatedFormData: any) => {
      this.metronomeService.setBPM(Number(updatedFormData.bpm));
    });

  }

  changeBPM(event) {

  }
}
