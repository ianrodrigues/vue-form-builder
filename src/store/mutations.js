import _ from 'lodash';
import Vue from 'vue';

export default {
  setForm(state, form) {
    state.form = form;
  },

  setFormItems(state, formItems) {
    state.formItems = formItems;
  },

  addPage({ form, formItems }, page) {
    form.items.push(page.uuid);
    Vue.set(formItems.page, page.uuid, page);
  },

  setPageTitle({ formItems: { page } }, { pageId, title }) {
    Vue.set(page[pageId], 'title', title);
  },

  setSectionTitle({ formItems: { section } }, { sectionId, title }) {
    Vue.set(section[sectionId], 'title', title);
  },

  setQuestionTitle({ formItems: { question } }, { questionId, title }) {
    Vue.set(question[questionId], 'title', title);
  },

  setQuestionResponseType({ formItems: { question } }, { questionId, response_type }) {
    Vue.set(question[questionId], 'response_type', response_type);
  },

  deletePage({ form, formItems }, pageId) {
    form.items.splice(pageId, 1);
    Vue.delete(formItems.page, pageId);
  },

  deleteSection({ formItems }, sectionId) {
    _.forEach(formItems.page, (page) => {
      _.remove(page.items, { id: sectionId, schema: 'section' });
    });

    _.forEach(formItems.section, (section) => {
      _.remove(section.items, { id: sectionId, schema: 'section' });
    });

    Vue.delete(formItems.section, sectionId);
  },

  deleteQuestion({ formItems }, questionId) {
    _.forEach(formItems.page, (page) => {
      _.remove(page.items, { id: questionId, schema: 'question' });
    });

    _.forEach(formItems.section, (section) => {
      _.remove(section.items, { id: questionId, schema: 'question' });
    });

    Vue.delete(formItems.question, questionId);
  },

  addSection({ formItems }, { parentSchema, parentId, section }) {
    const items = [
      ...formItems[parentSchema][parentId].items,
      {
        id: section.uuid,
        schema: 'section',
      },
    ];

    Vue.set(formItems[parentSchema][parentId], 'items', items);
    Vue.set(formItems.section, section.uuid, section);
  },

  addQuestion({ formItems }, { parentSchema, parentId, question }) {
    const items = [
      ...formItems[parentSchema][parentId].items,
      {
        id: question.uuid,
        schema: 'question',
      },
    ];

    Vue.set(formItems[parentSchema][parentId], 'items', items);
    Vue.set(formItems.question, question.uuid, question);
  },
};
