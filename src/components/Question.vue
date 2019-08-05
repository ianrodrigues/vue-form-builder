<template>
  <div class="form-element element-question">
    <div class="question-fields">
      <div>
        <input
          class="question-title-input"
          type="text"
          placeholder="What's your favorite superhero?"
          v-model="questionTitle">
      </div>

      <div>
        <div class="question-type-select">
          <select v-model="questionResponseType">
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <button class="button delete" @click="deleteQuestion(item.uuid)">
        Delete Question
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ZypQuestion',

  props: ['item'],

  methods: {
    ...mapActions(['deleteQuestion', 'updateQuestion']),
  },

  computed: {
    questionTitle: {
      get() {
        return this.item.title;
      },

      set(value) {
        this.updateQuestion({
          questionId: this.item.uuid,
          data: { title: value },
        });
      },
    },

    questionResponseType: {
      get() {
        return this.item.response_type;
      },

      set(value) {
        this.updateQuestion({
          questionId: this.item.uuid,
          data: { response_type: value },
        });
      },
    },
  },
};
</script>
