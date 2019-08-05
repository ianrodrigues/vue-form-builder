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
              <input class="hidden" type="file" @change="importForm">
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
      <div class="alert relative" role="alert" v-if="importFails">
        <p class="alert-header">Whoops!</p>
        <p>It looks like you're trying to import an invalid file.</p>

        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="importFails=false">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>

      <ZypPage v-for="page in formPages" v-bind:key="page.uuid" v-bind:page="page" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import ZypPage from '@/components/Page.vue';
import { CreateFormJsonBlob, SaveFile, ReadFormJsonFile, CreateNormalizedFormFromObject } from '@/services';

export default {
  name: 'ZypForm',

  components: { ZypPage },

  methods: {
    ...mapActions(['createNewForm', 'deleteForm', 'addPage']),

    exportForm() {
      const blob = CreateFormJsonBlob(this.form, this.formItems);
      SaveFile(`zypone-${this.form.uuid}.json`, blob, 'text/json');
    },

    importForm(event) {
      this.importFails = false;

      ReadFormJsonFile(event.target.files[0], (data) => {
        try {
          const { result, entities } = CreateNormalizedFormFromObject(JSON.parse(data));
          this.$store.commit('setForm', result);
          this.$store.commit('setFormItems', entities);
        } catch (error) {
          this.importFails = true;
        }
      });
    },
  },

  computed: {
    ...mapState({
      form: ({ form }) => form,
      formItems: ({ formItems }) => formItems,
    }),

    ...mapGetters(['formPages']),
  },

  data() {
    return {
      importFails: false,
    }
  }
};
</script>
