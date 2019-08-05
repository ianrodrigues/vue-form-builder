import uuid from 'uuid/v4';

import Question from '@/models/Question';

jest.mock('uuid/v4');
uuid.mockImplementation(() => '123e4567-e89b-12d3-a456-426655440000');

describe('Question.js', () => {
  it('should generate uuid during creation', () => {
    const question = new Question();
    expect(question.uuid).toBe('123e4567-e89b-12d3-a456-426655440000');
  });

  it('should create all required fields', () => {
    const question = new Question();
    expect(question).toMatchObject({
      uuid: '123e4567-e89b-12d3-a456-426655440000',
      type: 'question',
      title: null,
      response_type: 'text',
    });
  });

  it('should have text as default response type', () => {
    const question = new Question();
    expect(question.response_type).toBe('text');
  });
});
