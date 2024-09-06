import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, map, timer } from 'rxjs';
@Pipe({
  name: 'timer',
  standalone: true
})
export class TimerPipe implements PipeTransform {
  countSource = new BehaviorSubject(0);
  prevCount = 0;
  count$ = this.countSource.asObservable();
  transform(to: number, ...args: unknown[]) {
    this.startCounter(to)
    return this.count$.pipe(map(value => value));
  }
  ngOnInit() {
    this.count$.subscribe(_count => this.prevCount = _count)
  }
  startCounter(to: number) {
    let interval = setInterval(() => {
      if (this.prevCount === to) {
        clearInterval(interval);
        return;
      }
      this.countSource.next(this.prevCount + 1)
    }, 1_000)
  }

}
