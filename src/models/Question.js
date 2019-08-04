import uuid from 'uuid/v4';
import { schema } from 'normalizr';

export const QuestionSchema = new schema.Entity('questions', {}, { idAttribute: 'uuid' });

export const RESPONSE_TYPE_TEXT = 'text';
export const RESPONSE_TYPE_NUMBER = 'number';

export default class Question {
  constructor(id, title, responseType) {
    if (![RESPONSE_TYPE_TEXT, RESPONSE_TYPE_NUMBER].includes(responseType)) {
      throw new Error(`Invalid Response Type: ${responseType}`);
    }

    this.type = 'question';
    this.uuid = id;
    this.title = title;
    this.responseType = responseType;
  }
}

export const CreateNewQuestion = () => new Question(uuid(), '', 'text');
