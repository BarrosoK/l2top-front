import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {

  @Input('title') title: string;
  @Input('description') description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
