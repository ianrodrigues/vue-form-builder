
export default class Section {
  constructor(uuid, title) {
    this.uuid = uuid;
    this.type = 'section';
    this.title = title;
    this.items = [];
  }
}
