<template>
  <div class="form">
    <div class="form-header">
      <div class="flex-1">
        <img src="@/assets/images/zyp_one_logo_vertical.png" class="h-20 mr-4" />
      </div>

      <div>
        <div class="flex -mx-2" v-if="form.uuid === null">
          <button id="create-new-form-button" class="button blue" @click="createNewForm">
            Create Form
          </button>

          <div class="flex">
            <label class="button blue">
              <span>Import Form</span>
              <input class="hidden" type="file">
            </label>
          </div>
        </div>

        <div class="flex -mx-2" v-else>
          <button class="button orange" @click="addPage">
            Add Page
          </button>

          <button class="button purple" @click="exportForm">
            Export Form
          </button>

          <button class="button delete" @click="deleteForm">
            Delete Form
          </button>
        </div>
      </div>
    </div>

    <div class="form-body">
      <ZypPage v-for="page in formPages" v-bind:key="page.uuid" v-bind:page="page" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import ZypPage from '@/components/Page.vue';
import { CreateFormJsonBlob, SaveFile } from '@/services';

export default {
  name: 'ZypForm',

  components: { ZypPage },

  methods: {
    ...mapActions(['createNewForm', 'deleteForm', 'addPage']),

    exportForm() {
      const blob = CreateFormJsonBlob(this.form, this.formItems);

      SaveFile(`zypone-${this.form.uuid}.json`, blob, 'text/json');
    },
  },

  computed: {
    ...mapState({
      form: ({ form }) => form,
      formItems: ({ formItems }) => formItems,
    }),

    ...mapGetters(['formPages']),
  },
};
</script>
