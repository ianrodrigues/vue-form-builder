import _ from 'lodash';

import {
  CreateNormalizedForm, CreateNormalizedPage, CreateNormalizedSection, CreateNormalizedQuestion,
} from '@/services';
import { SECTION_TYPE } from '@/models/Section';
import state from '@/store/state';

export default {
  createNewForm({ commit }) {
    commit('setForm', CreateNormalizedForm())
  },

  deleteForm({ commit }) {
    commit('setForm', state.form);
    commit('setFormItems', state.formItems);
  },

  addPage({ commit }) {
    commit('addPage', CreateNormalizedPage());
  },

  updatePage({ commit }, payload) {
    commit('updatePage', payload);
  },

  deletePage({ commit, dispatch, state }, pageId) {
    _.forEachRight(state.formItems.page[pageId].items, (item) => {
      dispatch((item.schema === SECTION_TYPE) ? 'deleteSection' : 'deleteQuestion', item.id);
    });
    commit('deletePage', pageId);
  },

  addSection({ commit }, parent) {
    const section = CreateNormalizedSection();
    commit('addSection', { parent, section });
  },

  updateSection({ commit }, payload) {
    commit('updateSection', payload);
  },

  deleteSection({ commit, dispatch, state }, sectionId) {
    _.forEachRight(state.formItems.section[sectionId].items, (item) => {
      dispatch((item.schema === SECTION_TYPE) ? 'deleteSection' : 'deleteQuestion', item.id);
    });
    commit('deleteSection', sectionId);
  },

  addQuestion({ commit }, parent) {
    const question = CreateNormalizedQuestion();
    commit('addQuestion', { parent, question });
  },

  updateQuestion({ commit }, payload) {
    commit('updateQuestion', payload);
  },

  deleteQuestion({ commit }, questionId) {
    commit('deleteQuestion', questionId);
  },
};
