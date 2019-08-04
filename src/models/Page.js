import uuid from 'uuid/v4';

export default class Page {
  constructor(id, title) {
    this.type = 'page';
    this.uuid = id;
    this.title = title;
    this.items = [];
  }
}

export const CreateNewPage = () => new Page(uuid(), '');
