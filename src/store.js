import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import { normalize } from 'normalizr';

import { CreateNewForm, FormSchema } from '@/models/Form';
import { CreateNewPage, PageSchema } from '@/models/Page';

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
      entities.pages = _.reject(entities.pages, page => {
        return page.uuid === pageId;
      });

      _.remove(entities.forms[formId].items, item => item === pageId);
    },
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
  },
});
