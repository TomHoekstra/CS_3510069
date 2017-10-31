import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-live-quiz',
  templateUrl: './live-quiz.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class LiveQuizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
