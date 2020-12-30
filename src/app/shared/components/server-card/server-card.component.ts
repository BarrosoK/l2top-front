import {Component, Input, OnInit} from '@angular/core';
import {L2Group} from "@app/types/types";

@Component({
  selector: 'server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.scss']
})
export class ServerCardComponent implements OnInit {

  @Input() server: L2Group.Server;

  constructor() { }

  ngOnInit(): void {
  }

}
