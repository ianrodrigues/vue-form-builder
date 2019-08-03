<template>
  <div class="form-element element-section">
    <div>
      <input class="title-input" type="text" placeholder="Section Title" v-model="item.title" />
    </div>

    <div class="form-element-body">
      <component
        v-for="child in item.items"
        v-bind:is="child.type === 'section' ? 'ZypSection' : 'ZypQuestion'"
        v-bind:key="child.uuid"
        v-bind:item="child" />
    </div>

    <div class="form-element-actions">
      <button class="button green">
        Add Sub-Section
      </button>

      <button class="button indigo">
        Add Question
      </button>

      <button class="button delete">
        Delete Section
      </button>
    </div>
  </div>
</template>

<script>
import ZypQuestion from '@/components/Question.vue';

export default {
  name: 'ZypSection',

  components: { ZypQuestion },

  props: ['item'],
};
</script>
