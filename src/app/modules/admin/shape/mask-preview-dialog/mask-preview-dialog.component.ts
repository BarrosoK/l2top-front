import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mask-preview-dialog',
  templateUrl: './mask-preview-dialog.component.html',
  styleUrls: ['./mask-preview-dialog.component.scss']
})
export class MaskPreviewDialogComponent implements OnInit {

  img;
  svg;

  constructor(public dialogRef: MatDialogRef<MaskPreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.img = data.img;
    this.svg = data.svg;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
