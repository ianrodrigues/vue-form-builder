<template>
  <div class="form-element element-page">
    <div>
      <input class="title-input" type="text" placeholder="Page Title" v-model="pageTitle" />
    </div>

    <div class="form-element-body">
      <component
        v-for="element in pageItems(page.uuid)"
        v-bind:key="element.uuid"
        v-bind:is="element.type === SECTION_TYPE ? 'ZypSection' : 'ZypQuestion'"
        v-bind:item="element" />
    </div>

    <div class="form-element-actions">
      <button class="button green" @click="addSection({ type: PAGE_TYPE, id: page.uuid })">
        Add Section
      </button>

      <button class="button indigo" @click="addPageQuestion(page.uuid)">
        Add Question
      </button>

      <button class="button delete" @click="deletePage(page.uuid)">
        Delete Page
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { PAGE_TYPE } from '@/models/Page';
import { SECTION_TYPE } from '@/models/Section';
import ZypQuestion from '@/components/Question.vue';
import ZypSection from '@/components/Section.vue';

export default {
  name: 'ZypPage',

  components: { ZypQuestion, ZypSection },

  props: ['page'],

  methods: {
    ...mapActions(['updatePage', 'deletePage', 'addSection', 'addPageQuestion']),
  },

  computed: {
    ...mapGetters(['pageItems']),

    pageTitle: {
      get() {
        return this.page.title;
      },

      set(value) {
        this.updatePage({
          pageId: this.page.uuid,
          data: { title: value }
        });
      },
    },
  },

  data() {
    return {
      PAGE_TYPE,
      SECTION_TYPE,
    }
  },
};
</script>
