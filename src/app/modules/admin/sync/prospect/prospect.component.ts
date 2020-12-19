import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ToastrService} from 'ngx-toastr';
import {SyncService} from '@app/core/services/sync.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {

  selectedFile : File;
  file;
  fetching = false;

  result = null;
  prospectAmount;
  prospectDone;
  logs = [];

  constructor(private toastr: ToastrService, private syncService: SyncService,
              private socket: Socket) {
  }


  ngOnInit(): void {
    this.socket
      .fromEvent('prospect_amount')
      .subscribe(amount => {
        this.prospectAmount = amount;
      });

    this.socket
      .fromEvent('prospects_done')
      .subscribe(amount => {
        this.prospectDone = amount;
      });

    this.socket
      .fromEvent('prospects_log')
      .subscribe((log: string) => {
        this.logs.push(log);
      });
  }

  sync() {
    this.fetching = true;
    this.syncService.syncProspects(this.file).subscribe(res => {
      console.log(res);
    }, () => {},
      () => {
      this.fetching = false;
      });
  }

  onFileChanged(event) {

    if (event.target.files[0].type.split('/')[1] !== 'json') {
      return this.toastr.error('Only json files are allowed', 'Error Uploading file');
    }

    this.selectedFile = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.toastr.success('File loaded !', 'File upload');
      if (typeof fileReader.result === 'string') {
        console.log(fileReader.result);
        this.file = fileReader.result;
      }
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

}
