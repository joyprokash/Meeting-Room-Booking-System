import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-default-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
