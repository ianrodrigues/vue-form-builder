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

  it('should return an empty array when there is no sections or questions for a page', () => {
    const state = {
      formItems: {
        page: {
          '123e4567-e89b-12d3-a456-426655440000': {
            uuid: '123e4567-e89b-12d3-a456-426655440000',
          },
        },
        section: {
          '123e4567-e89b-12d3-a456-426655440002': {
            uuid: '123e4567-e89b-12d3-a456-426655440002',
          },
        },
        question: {
          '123e4567-e89b-12d3-a456-426655440003': {
            uuid: '123e4567-e89b-12d3-a456-426655440003',
          },
        },
      },
    }
    
    const pageItems = getters.pageItems(state)('123e4567-e89b-12d3-a456-426655440000');

    expect(pageItems).toEqual([]);
  });

  it('should return sections and questions for a page', () => {
    const state = {
      formItems: {
        page: {
          '123e4567-e89b-12d3-a456-426655440000': {
            uuid: '123e4567-e89b-12d3-a456-426655440000',
            items: [{
              id: '123e4567-e89b-12d3-a456-426655440001',
              schema: 'section'
            },{
              id: '123e4567-e89b-12d3-a456-426655440002',
              schema: 'question',
            }]
          },
        },
        section: {
          '123e4567-e89b-12d3-a456-426655440001': {
            uuid: '123e4567-e89b-12d3-a456-426655440001',
          },
          '123e4567-e89b-12d3-a456-426655440003': {
            uuid: '123e4567-e89b-12d3-a456-426655440001',
          },
        },
        question: {
          '123e4567-e89b-12d3-a456-426655440002': {
            uuid: '123e4567-e89b-12d3-a456-426655440002',
          },
          '123e4567-e89b-12d3-a456-426655440004': {
            uuid: '123e4567-e89b-12d3-a456-426655440004',
          },
        },
      },
    }
    
    const pageItems = getters.pageItems(state)('123e4567-e89b-12d3-a456-426655440000');

    expect(pageItems).toEqual([
      {
        uuid: '123e4567-e89b-12d3-a456-426655440001',
      },
      {
        uuid: '123e4567-e89b-12d3-a456-426655440002',
      }
    ]);
  });

  it('should return an empty array when there is no sections or questions for a page', () => {
    const state = {
      formItems: {
        section: {
          '123e4567-e89b-12d3-a456-426655440000': {
            uuid: '123e4567-e89b-12d3-a456-426655440000',
          },
        },
        question: {
          '123e4567-e89b-12d3-a456-426655440002': {
            uuid: '123e4567-e89b-12d3-a456-426655440002',
          },
          '123e4567-e89b-12d3-a456-426655440003': {
            uuid: '123e4567-e89b-12d3-a456-426655440003',
          },
        },
      },
    }
    
    const sectionItems = getters.sectionItems(state)('123e4567-e89b-12d3-a456-426655440000');

    expect(sectionItems).toEqual([]);
  });

  it('should return sections and questions for a section', () => {
    const state = {
      formItems: {
        section: {
          '123e4567-e89b-12d3-a456-426655440000': {
            uuid: '123e4567-e89b-12d3-a456-426655440000',
            items: [{
              id: '123e4567-e89b-12d3-a456-426655440001',
              schema: 'section'
            },{
              id: '123e4567-e89b-12d3-a456-426655440002',
              schema: 'question',
            }]
          },
          '123e4567-e89b-12d3-a456-426655440001': {
            uuid: '123e4567-e89b-12d3-a456-426655440001',
            items: []
          },
        },
        question: {
          '123e4567-e89b-12d3-a456-426655440002': {
            uuid: '123e4567-e89b-12d3-a456-426655440002',
          },
          '123e4567-e89b-12d3-a456-426655440003': {
            uuid: '123e4567-e89b-12d3-a456-426655440003',
          },
        },
      },
    }
    
    const sectionItems = getters.sectionItems(state)('123e4567-e89b-12d3-a456-426655440000');

    expect(sectionItems).toEqual([
      {
        uuid: '123e4567-e89b-12d3-a456-426655440001',
        items: [],
      },
      {
        uuid: '123e4567-e89b-12d3-a456-426655440002',
      }
    ]);
  });
});
