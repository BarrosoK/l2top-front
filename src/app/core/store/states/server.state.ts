import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AddVersions} from "@app/core/store/actions/server.actions";


export interface ServerStateModel {
  versions: string[];
}

@State<ServerStateModel>({
  name: 'server',
  defaults: {
    versions: []
  }
})
@Injectable()
export class ServerState {

  @Selector()
  static versionSelect(state: ServerStateModel): string[] {
    return state.versions;
  }


  @Action(AddVersions)
  addVersions(ctx: StateContext<ServerStateModel>, action: AddVersions) {
    ctx.setState(state => ({
      ...state,
      versions: [...state.versions, ...action.versions]
    }));
  }

}
