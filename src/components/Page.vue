<template>
  <div class="form-element element-page">
    <div>
      <input class="title-input" type="text" placeholder="Page Title" v-model="page.title" />
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

      <button class="button delete">
        Delete Page
      </button>
    </div>
  </div>
</template>

<script>
import ZypQuestion from '@/components/Question.vue';
import ZypSection from '@/components/Section.vue';

export default {
  name: 'ZypPage',

  components: { ZypQuestion, ZypSection },

  props: ['page'],
};
</script>
