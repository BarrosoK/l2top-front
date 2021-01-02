import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  serverForm: FormGroup;
  submitted = false;
  get f() { return this.serverForm.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.serverForm = this.formBuilder.group({
      name: ['', Validators.required],
      ip: ['', Validators.required],
      version: ['', Validators.required],
      location: ['', Validators.required],
      website: ['', Validators.required],
      rates: this.formBuilder.group({
        xp: ['', Validators.required],
        sp: ['', Validators.required],
        drop: ['', Validators.required],
        adena: ['', Validators.required],
      }),
      information: this.formBuilder.group({
        description: ['', Validators.required],
        promotionLink: [''],
        safeEnchant: [''],
        maxEnchant: [''],
        enchantRate: [''],
        blessedEnchantRate: [''],
        hasCustom: [''],
      })
    });
  }

  create() {
    console.log(this.serverForm.getRawValue());
  }

}
