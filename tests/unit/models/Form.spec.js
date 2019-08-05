import uuid from 'uuid/v4';

import Form from '@/models/Form';

jest.mock('uuid/v4');

describe('Form.js', () => {
  it('should generate uuid during creation', () => {
    uuid.mockImplementation(() => '123e4567-e89b-12d3-a456-426655440000');
    
    const form = new Form();
    
    expect(form.uuid).toBe('123e4567-e89b-12d3-a456-426655440000');
  });

  it('should create all required fields', () => {
    const form = new Form();
    
    expect(form).toMatchObject({
      uuid: '123e4567-e89b-12d3-a456-426655440000',
      type: 'form',
      items: [],
    });
  });
});
