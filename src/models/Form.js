import uuid from 'uuid/v4';

export const FORM_TYPE = 'form';

export default class Form {
  constructor() {
    this.uuid = uuid();
    this.type = FORM_TYPE;
    this.items = [];
  }
}
