import uuid from 'uuid/v4';

export const QUESTION_TYPE = 'question';
export const RESPONSE_TYPE_TEXT = 'text';
export const RESPONSE_TYPE_NUMBER = 'number';

export default class Question {
  constructor() {
    this.uuid = uuid();
    this.type = QUESTION_TYPE;
    this.title = null;
    this.response_type = RESPONSE_TYPE_TEXT;
  }
}
