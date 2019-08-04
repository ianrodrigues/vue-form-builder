import Vue from 'vue';
import Vuex from 'vuex';
import { normalize } from 'normalizr';

import { PageSchema, SectionSchema, QuestionSchema } from '@/store/schema';
import { CreateNewForm } from '@/models/Form';
import { CreateNewPage } from '@/models/Page';
import { CreateNewSection } from '@/models/Section';
import { CreateNewQuestion } from '@/models/Question';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    form: {
      uuid: null,
      pages: [],
    },

    formItems: {
      pages: {},
      sections: {},
      questions: {},
    },
  },

  getters: {
    formPages({ formItems: { pages } }) {
      try {
        return Object.values(pages);
      } catch (error) {
        return [];
      }
    },

    // eslint-disable-next-line
    pageItems({ formItems }, pageId) {
      // eslint-disable-next-line
      return (pageId) => {
        try {
          return formItems.pages[pageId].items.map(({ id, schema }) => formItems[schema][id]);
        } catch (error) {
          return [];
        }
      };
    },
  },

  mutations: {
    setForm(state, form) {
      state.form = form;
    },

    setFormItems(state, formItems) {
      state.form = formItems;
    },

    deleteForm(state) {
      state.formBuilder = {};
    },

    addPage({ form, formItems }, page) {
      form.pages.push(page.uuid);
      Vue.set(formItems.pages, page.uuid, page);
    },

    setPageTitle({ formItems: { pages } }, { pageId, title }) {
      Vue.set(pages[pageId], 'title', title);
    },

    deletePage({ form, formItems }, pageId) {
      form.pages.splice(pageId, 1);

      formItems.pages[pageId].items.forEach(({ id, schema }) => Vue.delete(formItems[schema], id));

      Vue.delete(formItems.pages, pageId);
    },

    addSection({ formItems }, { parentSchema, parentId, section }) {
      const items = [
        ...formItems[parentSchema][parentId].items,
        {
          id: section.uuid,
          schema: 'sections',
        },
      ];

      Vue.set(formItems[parentSchema][parentId], 'items', items);
      Vue.set(formItems.sections, section.uuid, section);
    },

    addQuestion({ formItems }, { parentSchema, parentId, question }) {
      const items = [
        ...formItems[parentSchema][parentId].items,
        {
          id: question.uuid,
          schema: 'questions',
        },
      ];

      Vue.set(formItems[parentSchema][parentId], 'items', items);
      Vue.set(formItems.questions, question.uuid, question);
    },
  },

  actions: {
    createNewForm({ commit }) {
      const { uuid } = CreateNewForm();

      const form = {
        uuid,
        pages: [],
      };

      commit('setForm', form);
    },

    deleteForm({ commit }) {
      const form = {
        uuid: null,
        pages: [],
      };

      const formItems = {
        pages: {},
        sections: {},
        questions: {},
      };

      commit('setForm', form);
      commit('setFormItems', formItems);
    },

    addPage({ commit }) {
      const { entities: { pages }, result } = normalize(CreateNewPage(), PageSchema);
      commit('addPage', pages[result]);
    },

    updatePageTitle({ commit }, payload) {
      commit('setPageTitle', payload);
    },

    deletePage({ commit }, pageId) {
      commit('deletePage', pageId);
    },

    addPageSection({ commit }, pageId) {
      const { entities: { sections }, result } = normalize(CreateNewSection(), SectionSchema);

      commit('addSection', { parentSchema: 'pages', parentId: pageId, section: sections[result] });
    },

    addPageQuestion({ commit }, pageId) {
      const { entities: { questions }, result } = normalize(CreateNewQuestion(), QuestionSchema);

      commit('addQuestion', { parentSchema: 'pages', parentId: pageId, question: questions[result] });
    },
  },
});
