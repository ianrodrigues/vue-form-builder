
export const PAGE_TYPE = 'page';

export default class Page {
  constructor(uuid, title) {
    this.uuid = uuid;
    this.type = PAGE_TYPE;
    this.title = title;
    this.items = [];
  }
}
