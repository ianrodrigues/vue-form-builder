<template>
  <div class="form-element element-page">
    <div>
      <input class="title-input" type="text" placeholder="Page Title" v-model="pageTitle" />
    </div>

    <div class="form-element-body">
      <component
        v-for="element in page.items"
        v-bind:key="element.uuid"
        v-bind:is="element.type === 'section' ? 'ZypSection' : 'ZypQuestion'"
        v-bind:item="element" />
    </div>

    <div class="form-element-actions">
      <button class="button green">
        Add Section
      </button>

      <button class="button indigo">
        Add Question
      </button>

      <button class="button delete" @click="deletePage({ formId, pageId: page.uuid })">
        Delete Page
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ZypQuestion from '@/components/Question.vue';
import ZypSection from '@/components/Section.vue';

export default {
  name: 'ZypPage',

  components: { ZypQuestion, ZypSection },

  props: ['page'],

  methods: {
    ...mapActions(['updatePageTitle', 'deletePage']),
  },
  
  computed: {
    ...mapGetters(['formId']),

    pageTitle: {
      get() {
        return this.page.title;
      },

      set(value) {
        this.updatePageTitle({
          pageId: this.page.uuid,
          title: value
        });
      },
    }
  },
};
</script>
