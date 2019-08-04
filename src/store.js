import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import { normalize } from 'normalizr';

import { CreateNewForm, FormSchema } from '@/models/Form';
import { CreateNewPage, PageSchema } from '@/models/Page';
import { CreateNewSection, SectionSchema } from '@/models/Section';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    formBuilder: {},
  },

  getters: {
    formId({ formBuilder }) {
      const formId = formBuilder.result;
      if (formId === undefined) {
        return null;
      }
      return formId;
    },

    formPages({ formBuilder }) {
      try {
        return Object.values(formBuilder.entities.pages);
      } catch (error) {
        return [];
      }
    },

    pageSections({ formBuilder: { entities } }, pageSectionIds) {
      return (pageSectionIds) => {
        try {
          return _.filter(entities.sections, section => pageSectionIds.includes(section.uuid));
        } catch (error) {
          return [];
        }
      }
    }
  },

  mutations: {
    createNewForm(state, form) {
      state.formBuilder = form;
    },

    deleteForm(state) {
      state.formBuilder = {};
    },

    addPage({ formBuilder }, { formId, page }) {
      Vue.set(formBuilder.entities, 'pages', {
        ...formBuilder.entities.pages,
        [page.uuid]: {
          ...page,
        },
      });

      Vue.set(formBuilder.entities.forms[formId], 'items', [
        ...formBuilder.entities.forms[formId].items,
        page.uuid,
      ]);
    },

    setPageTitle({ formBuilder: { entities } }, { pageId, title }) {
      Vue.set(entities.pages[pageId], 'title', title);
    },

    deletePage({ formBuilder: { entities } }, { formId, pageId }) {
      const page = _.find(entities.pages, page => page.uuid === pageId);
      
      page.items.forEach(sectionId => Vue.delete(entities.sections, sectionId));

      Vue.delete(entities.pages, pageId);

      _.remove(entities.forms[formId].items, item => item === pageId);
    },

    addSection({ formBuilder }, { parentId, section }) {
      Vue.set(formBuilder.entities, 'sections', {
        ...formBuilder.entities.sections,
        [section.uuid]: {
          ...section,
        },
      });

      Vue.set(formBuilder.entities.pages[parentId], 'items', [
        ...formBuilder.entities.pages[parentId].items,
        section.uuid,
      ]);
    }
  },

  actions: {
    createNewForm({ commit }) {
      commit('createNewForm', normalize(CreateNewForm(), FormSchema));
    },

    deleteForm({ commit }) {
      commit('deleteForm');
    },

    addPage({ commit }, formId) {
      const { entities: { pages }, result } = normalize(CreateNewPage(), PageSchema);
      
      commit('addPage', { formId, page: pages[result] });
    },

    updatePageTitle({ commit }, payload) {
      commit('setPageTitle', payload);
    },

    deletePage({ commit }, payload) {
      commit('deletePage', payload);
    },

    addSection({ commit }, parentId) {
      const { entities: { sections }, result } = normalize(CreateNewSection(), SectionSchema);
      
      commit('addSection', { parentId, section: sections[result] });
    }
  },
});
