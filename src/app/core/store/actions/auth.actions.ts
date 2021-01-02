import {Backend} from "@app/types/api";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: Backend.Register) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {
  }
}
