
export default class Page {
  constructor(uuid, title) {
    this.uuid = uuid;
    this.type = 'page';
    this.title = title;
    this.items = [];
  }
}
