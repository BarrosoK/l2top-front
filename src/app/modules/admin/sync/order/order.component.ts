import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {SyncService} from '@app/core/services/sync.service';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  dateIso = '';
  fetching = false;
  result = null;
  lastExecution;

  orderAmount;
  orderDone;
  logs = [];
  onlyNew = false;

  constructor(private syncService: SyncService, private toastr: ToastrService,
              private socket: Socket) {
  }

  ngOnInit(): void {
    this.getLastExecution();
    this.socket
      .fromEvent('orders_amount')
      .subscribe(amount => {
        this.orderAmount = amount;
      });

    this.socket
      .fromEvent('orders_done')
      .subscribe(amount => {
        this.orderDone = amount;
      });

    this.socket
      .fromEvent('order_log')
      .subscribe((log: string) => {
        this.logs.push(log);
      });
  }

  getLastExecution() {
    this.syncService.getLastestExecution().subscribe((res: any) => {
      console.log(res);
      this.lastExecution = res.execution;
    });
  }

  changeDate(date) {
    console.log(date);
    this.dateIso = moment(date).toISOString();
    console.log(this.dateIso);
  }

  sync() {
    if (this.dateIso === '') {
      return this.toastr.error('You have to choose a date');
    }
    this.orderDone = 0;
    this.result = null;
    this.logs = [];
    this.fetching = true;
    this.syncService.syncOrder(this.dateIso, this.onlyNew).subscribe((res: any) => {
      console.log(res);
      this.result = res.result;
      this.getLastExecution();
      return this.toastr.success('Sync finished !');
    }, (err) => {
      console.log(err);
    }, () => {
      this.fetching = false;
    });
  }
}
