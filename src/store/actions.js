import _ from 'lodash';

import {
  CreateNormalizedForm, CreateNormalizedPage, CreateNormalizedSection, CreateNormalizedQuestion,
} from '@/services';
import { FORM_TYPE } from '@/models/Form';
import { SECTION_TYPE } from '@/models/Section';
import { PAGE_TYPE } from '@/models/Page';

export default {
  createNewForm({ commit }) {
    commit('setForm', CreateNormalizedForm())
  },

  deleteForm({ commit }) {
    const form = {
      uuid: null,
      type: FORM_TYPE,
      items: [],
    };

    const formItems = {
      page: {},
      section: {},
      question: {},
    };

    commit('setForm', form);
    commit('setFormItems', formItems);
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

  addQuestion({ commit }, parent) {
    const question = CreateNormalizedQuestion();
    commit('addQuestion', { parent, question });
  },

  updateQuestion({ commit }, payload) {
    commit('updateQuestion', payload);
  },

  deleteSection({ commit, dispatch, state }, sectionId) {
    _.forEachRight(state.formItems.section[sectionId].items, (item) => {
      const action = (item.schema === SECTION_TYPE) ? 'deleteSection' : 'deleteQuestion';
      dispatch(action, item.id);
    });

    commit('deleteSection', sectionId);
  },

  deleteQuestion({ commit }, questionId) {
    commit('deleteQuestion', questionId);
  },
};
