export class SaveToken {
  static readonly type = '[Auth] Save Token';
  constructor(public token: string) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
  constructor() {
  }
}
