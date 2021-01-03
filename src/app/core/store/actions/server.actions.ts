export class AddVersions {
  static readonly type = '[Server] AddVersions';
  constructor(public versions: string[]) {
  }
}

