import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { buffer, tap } from 'rxjs/operators';
// filter is a operator for filtering

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,AfterViewInit {
  intervalData: number[] = [];
  showData$!: Observable<Event>;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.showData$ = fromEvent(document.getElementById('showButton')!, 'click');
  }

  startInterval() {
    interval(1000)
      .pipe(
        tap((data) => console.log(data)),
        buffer(this.showData$)
      )
      .subscribe((data: number[]) => {
        this.intervalData.push(...data);
      });
  }
}
