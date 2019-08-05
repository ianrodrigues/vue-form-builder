import uuid from 'uuid/v4';

import Section from '@/models/Section';

jest.mock('uuid/v4');
uuid.mockImplementation(() => '123e4567-e89b-12d3-a456-426655440000');

describe('Section.js', () => {
  it('should generate uuid during creation', () => {
    const section = new Section();
    expect(section.uuid).toBe('123e4567-e89b-12d3-a456-426655440000');
  });

  it('should create all required fields', () => {
    const section = new Section();
    expect(section).toMatchObject({
      uuid: '123e4567-e89b-12d3-a456-426655440000',
      type: 'section',
      title: null,
      items: [],
    });
  });
});
