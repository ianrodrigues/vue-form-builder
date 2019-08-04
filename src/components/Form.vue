<template>
  <div class="form">
    <div class="form-header">
      <div class="flex-1">
        <img src="@/assets/images/zyp_one_logo_vertical.png" class="h-20 mr-4" />
      </div>

      <div>
        <div class="flex -mx-2" v-if="formId === null">
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
          <button class="button orange">
            Add Page
          </button>

          <button class="button purple">
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
import { mapActions, mapGetters } from 'vuex';

import ZypPage from '@/components/Page.vue';

export default {
  name: 'ZypForm',

  components: { ZypPage },

  methods: mapActions(['createNewForm', 'deleteForm']),

  computed: {
    ...mapGetters(['formId', 'formPages']),
  },
};
</script>
