import uuid from 'uuid/v4';

export const PAGE_TYPE = 'page';

export default class Page {
  constructor() {
    this.uuid = uuid();
    this.type = PAGE_TYPE;
    this.title = null;
    this.items = [];
  }
}
