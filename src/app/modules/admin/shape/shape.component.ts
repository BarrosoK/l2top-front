import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SyncService} from '@app/core/services/sync.service';
import {Socket} from 'ngx-socket-io';
import {DomSanitizer} from '@angular/platform-browser';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import * as Papa from 'papaparse';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import axios from 'axios';
import {Buffer} from 'buffer';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ShapeService} from '@app/core/services/shape.service';
import {MatDialog} from '@angular/material/dialog';
import {MaskPreviewDialogComponent} from '@app/modules/admin/shape/mask-preview-dialog/mask-preview-dialog.component';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';

export interface ImageMask {
  id: string;
  sku: string;
  total: number;
}

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss']
})
export class ShapeComponent implements OnInit {
  @ViewChild('maskList', {static: false}) accordion: MatAccordion;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('test', {static: false}) someComponentExpansionPanel: MatExpansionPanel;

  selectedFile: File;
  file;
  imageOriginal;
  svg;

  search = {
    id: '',
    sku: ''
  };
  results = [];
  dataList: any[];
  images: {}[] = [];
  dataSource = new MatTableDataSource<ImageMask>(this.results);

  constructor(private toastr: ToastrService, private syncService: SyncService, private http: HttpClient,
              private socket: Socket, private sanitizer: DomSanitizer, private ngxCsvParser: NgxCsvParser,
              private shapeService: ShapeService, public dialog: MatDialog) {
  }

  getBase64(url = 'http://files.pandacola.com/bvwm2cjvbcat/personnalisation/yourock1-blanc.png'): any {
    return axios.get('https://cors-anywhere.herokuapp.com/' + url, {
      responseType: 'arraybuffer'
    })
      .then(response => {
        return this.imageOriginal = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
          + Buffer.from(response.data, 'binary').toString('base64'));
      });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onFileChangedCsv(event) {

    // if (event.target.files[0].type.split('/')[1] !== 'csv') {
    //  return this.toastr.error('Only json files are allowed', 'Error Uploading file');
    //
    // }

    this.selectedFile = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {

      this.toastr.success('File loaded !', 'File upload');
      if (typeof fileReader.result === 'string') {
        this.file = fileReader.result;
        Papa.parse(this.selectedFile, {
          header: true,
          skipEmptyLines: true,
          complete: (result, file) => {
            this.dataList = result.data;
            this.dataList.forEach(row => {
              const images = {
                id: row['offer-id'],
                sku: row['product-sku'],
                total: 0
              };
              for (let i = 1; i < 10; i++) {
                if ((row[`area${i}-image`] !== '' && row[`area${i}-mask`] !== '')) {
                  images[`area${i}-image`] = row[`area${i}-image`];
                  images[`area${i}-mask`] = row[`area${i}-mask`];
                  images.total++;
                }
              }
              if (images.total > 0) {
                this.images.push(images);
              }
            });
          }
        });
      }
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  openDialog(imageOriginal, svg) {
    this.dialog.open(MaskPreviewDialogComponent, {
      data: {
        img: imageOriginal,
        svg
      }
    });
  }

  callApi(urlOriginal, urlMask, row, reduce = false) {
    this.shapeService.detectShape(urlOriginal, urlMask)
      .subscribe((res: any) => {
        console.log('Svg:', res.svg);
        if (reduce) {
          const regex = /width="\d+" height="\d+"/gi;
          row.svg = this.sanitizer.bypassSecurityTrustHtml(res.svg.replace(regex, 'width="200" height="200"'));
        } else {
          row.svg = this.sanitizer.bypassSecurityTrustHtml(res.svg);
        }
      });
  }

  async findShape() {
    let i = 0;
    for (const row of this.images) {
      i++;
      if (i > 100) {
        continue;
      }
      if (row['area1-image'] !== undefined) {
        const original = await this.getBase64(row['area1-image']);
        const mask = await this.getBase64(row['area1-mask']);
        // this.shapeService.detectShape(original.changingThisBreaksApplicationSecurity, mask.changingThisBreaksApplicationSecurity).subscribe(res => {
        //  console.log(res);
        // });
      }
      this.results.push(row);
    }
    this.dataSource = new MatTableDataSource<ImageMask>(this.results);
  }

  counter(i: number) {
    return new Array(i);
  }

}
