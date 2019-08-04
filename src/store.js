import _ from 'lodash';
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

    // eslint-disable-next-line
    sectionItems({ formItems }, sectionId) {
      // eslint-disable-next-line
      return (sectionId) => {
        try {
          return formItems.sections[sectionId].items.map(({ id, schema }) => formItems[schema][id]);
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
      state.formItems = formItems;
    },

    addPage({ form, formItems }, page) {
      form.pages.push(page.uuid);
      Vue.set(formItems.pages, page.uuid, page);
    },

    setPageTitle({ formItems: { pages } }, { pageId, title }) {
      Vue.set(pages[pageId], 'title', title);
    },

    setSectionTitle({ formItems: { sections } }, { sectionId, title }) {
      Vue.set(sections[sectionId], 'title', title);
    },

    deletePage({ form, formItems }, pageId) {
      Vue.delete(formItems.pages, pageId);
    },

    deleteSection({ formItems }, sectionId) {
      _.forEach(formItems.pages, page => {
        _.remove(page.items, { id: sectionId, schema: 'sections' });
      });

      _.forEach(formItems.sections, section => {
        _.remove(section.items, { id: sectionId, schema: 'sections' });
      });

      Vue.delete(formItems.sections, sectionId);
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

    deletePage({ commit, dispatch, state }, pageId) {
      state.formItems.pages[pageId].items.forEach(item => {
        dispatch('deleteSection', item.id);
      });

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

    addSubSection({ commit }, sectionId) {
      const { entities: { sections }, result } = normalize(CreateNewSection(), SectionSchema);

      commit('addSection', { parentSchema: 'sections', parentId: sectionId, section: sections[result] });
    },

    updateSectionTitle({ commit }, payload) {
      commit('setSectionTitle', payload);
    },

    deleteSection({ commit, dispatch, state }, sectionId) {
      state.formItems.sections[sectionId].items.forEach(item => {
        dispatch('deleteSection', item.id);
      });

      // console.log('remove section: ', sectionId);
      commit('deleteSection', sectionId);
    },
  },
});
