
export const FORM_TYPE = 'form';

export default class Form {
  constructor(uuid) {
    this.uuid = uuid;
    this.type = FORM_TYPE;
    this.items = [];
  }
}
