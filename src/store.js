import Vue from 'vue';
import Vuex from 'vuex';
import { normalize } from 'normalizr';

import { CreateNewForm, FormSchema } from '@/models/Form';

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
        return formBuilder.entities.pages;
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
    }
  },

  actions: {
    createNewForm({ commit }) {
      commit('createNewForm', normalize(CreateNewForm(), FormSchema));
    },

    deleteForm({ commit }) {
      commit('deleteForm');
    }
  },
});
