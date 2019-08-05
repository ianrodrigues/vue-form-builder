import uuid from 'uuid/v4';

import Page from '@/models/Page';

jest.mock('uuid/v4');

describe('Page.js', () => {
  it('should generate uuid during creation', () => {
    uuid.mockImplementation(() => '123e4567-e89b-12d3-a456-426655440000');
    
    const page = new Page();
    
    expect(page.uuid).toBe('123e4567-e89b-12d3-a456-426655440000');
  });

  it('should create all required fields', () => {
    const page = new Page();
    
    expect(page).toMatchObject({
      uuid: '123e4567-e89b-12d3-a456-426655440000',
      type: 'page',
      title: null,
      items: [],
    });
  });
});
