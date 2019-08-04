<template>
  <div class="form-element element-question">
    <div class="question-fields">
      <div>
        <input
          class="question-title-input"
          type="text"
          placeholder="What's your favorite superhero?"
          v-model="item.title">
      </div>

      <div>
        <div class="question-type-select">
          <select v-model="item.responseType">
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <button class="button delete">
        Delete Question
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZypQuestion',

  props: ['item'],
};
</script>
