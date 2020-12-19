import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Logout, SaveToken} from '../actions/auth.actions';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export interface AuthStateModel {
  token: string;
  username: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: undefined,
    username: undefined
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static tokenSelect(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static usernameSelect(state: AuthStateModel) {
    return state.username;
  }

  @Action(SaveToken)
  saveToken(ctx: StateContext<AuthStateModel>, action: SaveToken) {
    const decodedToken = helper.decodeToken(action.token);
    if (decodedToken.user === null) {
      return;
    }
    console.log('oui');
    localStorage.setItem('token', action.token);
    ctx.setState((state) => ({
      ...state,
      username: decodedToken.user,
      token: action.token
    }));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    console.log('called');
    ctx.setState(state => ({
      ...state,
      token : undefined,
      username: undefined
    }));
    localStorage.removeItem('token');
  }

}
