
export default {
  formPages({ formItems: { page } }) {
    return Object.values(page);
  },

  // eslint-disable-next-line
  pageItems({ formItems }, pageId) {
    // eslint-disable-next-line
    return (pageId) => {
      try {
        return formItems.page[pageId].items.map(({ id, schema }) => formItems[schema][id]);
      } catch (error) {
        return [];
      }
    };
  },

  // eslint-disable-next-line
  sectionItems({ formItems }, sectionId) {
    // eslint-disable-next-line
    return (sectionId) => {
      try {
        return formItems.section[sectionId].items.map(({ id, schema }) => formItems[schema][id]);
      } catch (error) {
        return [];
      }
    };
  },
};
