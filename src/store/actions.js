import _ from 'lodash';
import { normalize } from 'normalizr';

import {
  FormSchema, PageSchema, SectionSchema, QuestionSchema,
} from '@/store/schema';
import {
  CreateNewForm, CreateNewPage, CreateNewSection, CreateNewQuestion,
} from '@/services';

export default {
  createNewForm({ commit }) {
    const { result } = normalize(CreateNewForm(), FormSchema);
    commit('setForm', result);
  },

  deleteForm({ commit }) {
    const form = {
      uuid: null,
      type: 'form',
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
    const { entities: { page }, result } = normalize(CreateNewPage(), PageSchema);
    commit('addPage', page[result]);
  },

  updatePageTitle({ commit }, payload) {
    commit('setPageTitle', payload);
  },

  deletePage({ commit, dispatch, state }, pageId) {
    _.forEachRight(state.formItems.page[pageId].items, (item) => {
      const action = (item.schema === 'section') ? 'deleteSection' : 'deleteQuestion';
      dispatch(action, item.id);
    });

    commit('deletePage', pageId);
  },

  addPageSection({ commit }, pageId) {
    const { entities: { section }, result } = normalize(CreateNewSection(), SectionSchema);

    commit('addSection', { parentSchema: 'page', parentId: pageId, section: section[result] });
  },

  addPageQuestion({ commit }, pageId) {
    const { entities: { question }, result } = normalize(CreateNewQuestion(), QuestionSchema);

    commit('addQuestion', { parentSchema: 'page', parentId: pageId, question: question[result] });
  },

  addSubSection({ commit }, sectionId) {
    const { entities: { section }, result } = normalize(CreateNewSection(), SectionSchema);

    commit('addSection', { parentSchema: 'section', parentId: sectionId, section: section[result] });
  },

  updateSectionTitle({ commit }, payload) {
    commit('setSectionTitle', payload);
  },

  deleteSection({ commit, dispatch, state }, sectionId) {
    _.forEachRight(state.formItems.section[sectionId].items, (item) => {
      const action = (item.schema === 'section') ? 'deleteSection' : 'deleteQuestion';
      dispatch(action, item.id);
    });

    commit('deleteSection', sectionId);
  },

  addSectionQuestion({ commit }, sectionId) {
    const { entities: { question }, result } = normalize(CreateNewQuestion(), QuestionSchema);

    commit('addQuestion', { parentSchema: 'section', parentId: sectionId, question: question[result] });
  },

  deleteQuestion({ commit }, questionId) {
    commit('deleteQuestion', questionId);
  },

  updateQuestionTitle({ commit }, payload) {
    commit('setQuestionTitle', payload);
  },

  updateQuestionResponseType({ commit }, payload) {
    commit('setQuestionResponseType', payload);
  },
};
