import getters from '@/store/getters';

describe('getters.js', () => {
  it('should return an empty array when there is no page', () => {
    const state = {
      formItems: {
        page: {},
      },
    }
    
    const pages = getters.formPages(state);

    expect(pages).toEqual([]);
  });

  it('should return an array of the existing pages', () => {
    const state = {
      formItems: {
        page: {
          '123e4567-e89b-12d3-a456-426655440000': {
            uuid: '123e4567-e89b-12d3-a456-426655440000',
            type: 'page',
          },
          '123e4567-e89b-12d3-a456-426655440001': {
            uuid: '123e4567-e89b-12d3-a456-426655440001',
            type: 'page',
          },
        },
      },
    }
    
    const pages = getters.formPages(state);

    expect(pages).toEqual([
      {
        uuid: '123e4567-e89b-12d3-a456-426655440000',
        type: 'page',
      },
      {
        uuid: '123e4567-e89b-12d3-a456-426655440001',
        type: 'page',
      }
    ]);
  });
});
