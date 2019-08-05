<template>
  <div class="form-element element-section">
    <div>
      <input class="title-input" type="text" placeholder="Section Title" v-model="sectionTitle" />
    </div>

    <div class="form-element-body">
      <component
        v-for="child in sectionItems(item.uuid)"
        v-bind:is="child.type === SECTION_TYPE ? 'ZypSection' : 'ZypQuestion'"
        v-bind:key="child.uuid"
        v-bind:item="child" />
    </div>

    <div class="form-element-actions">
      <button class="button green" @click="addSection({ type: SECTION_TYPE, id: item.uuid })">
        Add Sub-Section
      </button>

      <button class="button indigo" @click="addQuestion({ type: SECTION_TYPE, id: item.uuid })">
        Add Question
      </button>

      <button class="button delete" @click="deleteSection(item.uuid)">
        Delete Section
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { SECTION_TYPE } from '@/models/Section';
import ZypQuestion from '@/components/Question.vue';

export default {
  name: 'ZypSection',

  components: { ZypQuestion },

  props: ['item'],

  methods: {
    ...mapActions(['addSection', 'updateSection', 'deleteSection', 'addQuestion']),
  },

  computed: {
    ...mapGetters(['sectionItems']),

    sectionTitle: {
      get() {
        return this.item.title;
      },

      set(value) {
        this.updateSection({
          sectionId: this.item.uuid,
          data: { title: value },
        });
      },
    },
  },

  data() {
    return {
      SECTION_TYPE,
    }
  },
};
</script>
