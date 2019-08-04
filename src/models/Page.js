import uuid from 'uuid/v4';
import { schema } from 'normalizr';

export const CreateNewPage = () => {
  return new Page(uuid(), '');
};

export const PageSchema = new schema.Entity('pages', {}, { idAttribute: 'uuid' });

export default class Page {
  constructor(uuid, title) {
    this.type = 'page';
    this.uuid = uuid;
    this.title = title;
    this.items = [];
  }
}
