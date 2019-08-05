
export const QUESTION_TYPE = 'question';
export const RESPONSE_TYPE_TEXT = 'text';
export const RESPONSE_TYPE_NUMBER = 'number';

export default class Question {
  constructor(uuid, title, response_type) {
    if (![RESPONSE_TYPE_TEXT, RESPONSE_TYPE_NUMBER].includes(response_type)) {
      throw new Error(`Invalid Response Type: ${response_type}`);
    }

    this.uuid = uuid;
    this.type = QUESTION_TYPE;
    this.title = title;
    this.response_type = response_type;
  }
}
