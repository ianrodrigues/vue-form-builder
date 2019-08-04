import uuid from 'uuid/v4';
import { schema } from 'normalizr';

export const SectionSchema = new schema.Entity('sections', {}, { idAttribute: 'uuid' });

export default class Section {
  constructor(id, title) {
    this.type = 'section';
    this.uuid = id;
    this.title = title;
    this.items = [];
  }
}

export const CreateNewSection = () => new Section(uuid(), '');
