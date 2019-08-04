import uuid from 'uuid/v4';
import { schema } from 'normalizr';

export const CreateNewForm = () => {
  return new Form(uuid());
};

export const FormSchema = new schema.Entity('forms', {}, { idAttribute: 'uuid' });

export default class Form {
  constructor(uuid) {
    this.type = 'form';
    this.uuid = uuid;
    this.items = [];
  }
}
