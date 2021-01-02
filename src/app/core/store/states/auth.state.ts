import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Login, Logout} from '../actions/auth.actions';
import {JwtHelperService} from '@auth0/angular-jwt';
import {L2Group} from "@app/types/types";
import * as moment from "moment";


export interface AuthStateModel {
  tokens: L2Group.Tokens;
  user: L2Group.User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    tokens: {
      access: {
        token: undefined,
        expires: undefined,
      },
      refresh:{
        token: undefined,
        expires: undefined,
      }
    },
    user: {
      email: undefined,
      id: undefined,
      name: undefined,
      role: undefined,
    }
  }
})
@Injectable()
export class AuthState {

  @Selector()
  static isLogged(state: AuthStateModel): boolean {
    return state.tokens.access.token !== undefined && (moment(state.tokens.access.expires) > moment());
  }

  @Selector()
  static tokenSelect(state: AuthStateModel): L2Group.Tokens {
    return state.tokens;
  }

  @Selector()
  static userSelect(state: AuthStateModel): L2Group.User {
    return state.user;
  }




  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    localStorage.setItem('token', JSON.stringify(action.payload.tokens));
    ctx.setState((state) => ({
      ...state,
      ...action.payload,
    }));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState(state => ({
      tokens: {
        access: {
          token: undefined,
          expires: undefined,
        },
        refresh:{
          token: undefined,
          expires: undefined,
        }
      },
      user: {
        email: undefined,
        id: undefined,
        name: undefined,
        role: undefined,
      }
    }));
    localStorage.removeItem('auth');
  }

}
