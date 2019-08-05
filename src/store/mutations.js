import _ from 'lodash';
import Vue from 'vue';

import { SECTION_TYPE } from '@/models/Section';
import { QUESTION_TYPE } from '@/models/Question';

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

  updatePage({ formItems: { page } }, { pageId, data }) {
    Vue.set(page, pageId, { ...page[pageId], ...data });
  },

  deletePage({ form, formItems }, pageId) {
    form.items.splice(pageId, 1);
    Vue.delete(formItems.page, pageId);
  },

  addSection({ formItems }, { parent, section }) {
    const items = [
      ...formItems[parent.type][parent.id].items,
      {
        id: section.uuid,
        schema: SECTION_TYPE,
      },
    ];

    Vue.set(formItems[parent.type][parent.id], 'items', items);
    Vue.set(formItems.section, section.uuid, section);
  },

  updateSection({ formItems: { section } }, { sectionId, data }) {
    Vue.set(section, sectionId, { ...section[sectionId], ...data });
  },

  deleteSection({ formItems }, sectionId) {
    _.forEach(formItems.page, (page) => {
      _.remove(page.items, { id: sectionId, schema: SECTION_TYPE });
    });

    _.forEach(formItems.section, (section) => {
      _.remove(section.items, { id: sectionId, schema: SECTION_TYPE });
    });

    Vue.delete(formItems.section, sectionId);
  },

  addQuestion({ formItems }, { parent, question }) {
    const items = [
      ...formItems[parent.type][parent.id].items,
      {
        id: question.uuid,
        schema: QUESTION_TYPE,
      },
    ];

    Vue.set(formItems[parent.type][parent.id], 'items', items);
    Vue.set(formItems.question, question.uuid, question);
  },

  updateQuestion({ formItems: { question } }, { questionId, data }) {
    Vue.set(question, questionId, { ...question[questionId], ...data });
  },

  deleteQuestion({ formItems }, questionId) {
    _.forEach(formItems.page, (page) => {
      _.remove(page.items, { id: questionId, schema: QUESTION_TYPE });
    });

    _.forEach(formItems.section, (section) => {
      _.remove(section.items, { id: questionId, schema: QUESTION_TYPE });
    });

    Vue.delete(formItems.question, questionId);
  },
};
