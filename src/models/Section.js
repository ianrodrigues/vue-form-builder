import uuid from 'uuid/v4';

export const SECTION_TYPE = 'section';

export default class Section {
  constructor() {
    this.uuid = uuid();
    this.type = SECTION_TYPE;
    this.title = null;
    this.items = [];
  }
}
