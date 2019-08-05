
export const SECTION_TYPE = 'section';

export default class Section {
  constructor(uuid, title) {
    this.uuid = uuid;
    this.type = SECTION_TYPE;
    this.title = title;
    this.items = [];
  }
}
