import uuid from 'uuid/v4';
import { schema } from 'normalizr';

export const CreateNewSection = () => {
  return new Section(uuid(), '');
};

export const SectionSchema = new schema.Entity('sections', {}, { idAttribute: 'uuid' });

export default class Section {
  constructor(uuid, title) {
    this.type = 'section';
    this.uuid = uuid;
    this.title = title;
    this.items = [];
  }
}
