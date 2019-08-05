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
      <div class="alert" role="alert" v-if="importFails">
        <p class="alert-header">Whoops!</p>
        <p>It looks like you're trying to import an invalid file.</p>
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
