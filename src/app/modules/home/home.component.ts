import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {AuthState} from "@app/core/store/states/auth.state";
import {Observable} from "rxjs";
import {ServerState} from "@app/core/store/states/server.state";
import {Logout} from "@app/core/store/actions/auth.actions";
import {AddVersions} from "@app/core/store/actions/server.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(AuthState.isLogged) isLogged$: Observable<boolean>;
  @Select(ServerState.versionSelect) versions$: Observable<string[]>;


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AddVersions(['int', 'deux'])).subscribe();
  }

}
