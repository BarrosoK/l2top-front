import { Component, OnInit } from '@angular/core';
import {DicomService} from '@app/core/services/dicom.service';

@Component({
  selector: 'app-dicom',
  templateUrl: './dicom.component.html',
  styleUrls: ['./dicom.component.scss']
})
export class DicomComponent implements OnInit {

  fileToUpload: File = null;
  imageToShow: any;
  infos = '';

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  constructor(private dicomService: DicomService) { }

  ngOnInit(): void {
  }

  parseDicom(image = true) {
    this.dicomService.parseDicom(this.fileToUpload, image).subscribe(data => {
      if (image) {
        this.createImageFromBlob(data);
      } else {
        this.infos = data;
      }
    }, error => {
      console.log(error);
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
