import { Pipe, PipeTransform } from '@angular/core';
import { timer } from 'rxjs';
@Pipe({
  name: 'timer',
  standalone: true
})
export class TimerPipe implements PipeTransform {

  transform(delay: number, ...args: unknown[]) {
    return timer(0, delay);
  }

}
