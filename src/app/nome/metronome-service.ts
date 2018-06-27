import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { map, tap, scan } from 'rxjs/operators';

@Injectable()
export class MetronomeService {

  heartBeat$: Subject<any> = new Subject();
  processor$: Observable<any>;
  processorSubcription: Subscription;

  /** Assume only qarter note 4/4 for now */
  setBPM(beatsPerMinute: number) {
    this.cancelExistingTimeEmitter();

    // given bpm = 60

    // = 240
    const measuresPerMinute = beatsPerMinute / 4;

    // = 7,680
    const pulsesPerMinute = beatsPerMinute * 128;

    // 128 = 1 pulse per second (1 quarter note in 128 slices)
    const pulsesPerSecond = pulsesPerMinute / 60;

    // convert to ms intervals

    // cps -> interval in ms between cycles
    const cyclesPerSecond = 1000 / 128;

    const pulseIntervalMS = 1000 / pulsesPerSecond;

    this.processor$ = interval(pulseIntervalMS);
    this.processorSubcription =
      this.processor$.pipe(
        map((intervalNumber: number) => {

          return {
            clockTickNumber: intervalNumber,
            measureTick: intervalNumber % 128
          };
        }),
        /*map((clockData: any) => {
          return {
            ...clockData,
            measureResolutionValue: Math.floor(clockData.measureTick % 128),
            thirtySecond: clockData.measureTick % 64,
            sixteenth: clockData.measureTick % 16,
            eighth: clockData.measureTick % 8,
            quarter: clockData.measureTick % 4,
            half: clockData.measureTick % 2
          };
        }),
        */
        scan((accumulator: any, value: any) => {
           const tick = value.measureTick;
           const triggerNextQuarterNote = tick % 128 === 0;
           const triggerNextEighthNote = tick % 64 === 0;
           const triggerNextSixteenthNote = tick % 32 === 0;
           const triggerNextThirtySecondNote = tick % 16 === 0;

           let measure = accumulator.measure;
           let half = accumulator.half;
           const triggerWholeNote = false;

           let quarter = accumulator.quarter;
           if (triggerNextQuarterNote) {
             if (quarter > 3) {
               quarter = 1;
               measure++;
             } else {
               quarter = quarter + 1;
             }
             if (quarter === 1) {
               half = 1;
             } else if (quarter === 3) {
               half = 2;
             }
           }

           let eighth = accumulator.eighth;
           if (triggerNextEighthNote) {
               eighth = accumulator.eighth > 7 ? 1: accumulator.eighth + 1;
           }

           let sixteenth = accumulator.sixteenth;
           if (triggerNextSixteenthNote) {
              sixteenth = accumulator.sixteenth > 15 ? 1 : accumulator.sixteenth + 1;
           }

           let thirtysecondth = accumulator.thirtysecondth;
           if (triggerNextThirtySecondNote) {
             thirtysecondth = accumulator.thirtysecondth > 31 ? 1 : accumulator.thirtysecondth + 1;
           }

           return {
             tick,
             measure,
             half,
             quarter,
             eighth,
             sixteenth,
             thirtysecondth

           };
        }, {
            measure: 1,
            tick: -1,
            beat: 0,
            whole: 1,
            half: 0,
            quarter: 0,
            eighth: 0,
            sixteenth: 0,
            thirtysecondth: 0
        })
      )
      .subscribe(pulseNumber => this.heartBeat$.next(pulseNumber));
  }

  cancelExistingTimeEmitter() {
    if (this.processorSubcription && !this.processorSubcription.closed) {
      this.processorSubcription.unsubscribe();
    }
  }
}
