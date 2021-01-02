import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input('formGroup') formGroup: FormGroup;
  @Input('controlName') controlName: string;
  @Input('formGroupName') formGroupName: string;
  @Input('title') title: string;

  get f() {
    return this.formGroupName === undefined ?
        this.formGroup.controls :
        this.formGroup.controls[this.formGroupName].get(this.controlName);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
