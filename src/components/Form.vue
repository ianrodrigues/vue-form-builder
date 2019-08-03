<template>
  <div class="form">
    <div class="form-header">
      <div class="flex-1">
        <img src="@/assets/images/zyp_one_logo_vertical.png" class="h-20 mr-4" />
      </div>

      <div>
        <div class="flex -mx-2" v-if="form === {}">
          <button class="button blue" @click="createNewForm">
            Create Form
          </button>

          <div class="flex">
            <label class="button blue">
              <span>Load File</span>
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

          <button class="button delete">
            Discard Form
          </button>
        </div>
      </div>
    </div>

    <div class="form-body">
      <ZypPage v-for="page in form.items" v-bind:key="page.uuid" v-bind:page="page" />
    </div>
  </div>
</template>

<script>
import ZypPage from '@/components/Page.vue';

export default {
  name: 'ZypForm',

  components: { ZypPage },

  data() {
    return {
      form: {
        type: 'form',
        uuid: '0c8a626e-15d2-493f-af0d-23813e6f8c04',
        items: [
          {
            type: 'page',
            uuid: '60e06a12-50e4-4313-9f5f-92ee76054bfa',
            title: 'Main',
            items: [
              {
                type: 'section',
                uuid: 'c6c8d612-b444-4ec7-ae00-beb8458bbaeb',
                title: 'Personal',
                items: [
                  {
                    type: 'question',
                    uuid: 'aec8d017-ed3f-4dbb-ab65-64f5b1a9b3e1',
                    title: 'First Name',
                    response_type: 'text',
                  },
                  {
                    type: 'question',
                    uuid: 'e769d0ec-426e-4412-9f09-d788231d642f',
                    title: 'Last Name',
                    response_type: 'text',
                  },
                  {
                    type: 'question',
                    uuid: 'd3b3ac62-190a-4e3e-9fb5-6146a312f4cd',
                    title: 'Age',
                    response_type: 'number',
                  },
                  {
                    type: 'section',
                    uuid: 'f9fe2e4a-9f82-4be6-9410-67d066053c64',
                    title: 'Address',
                    items: [
                      {
                        type: 'question',
                        uuid: '125b074d-3376-47a2-8217-b42e2f5a0898',
                        title: 'Address Line 1',
                        response_type: 'text',
                      },
                      {
                        type: 'question',
                        uuid: '9e76432a-79f4-4199-a2c4-130e164a845c',
                        title: 'Address Line 2',
                        response_type: 'text',
                      },
                    ],
                  },
                  {
                    type: 'section',
                    uuid: '4939a1d1-c9bd-4855-aa1c-8d00423b4312',
                    title: 'Contact',
                    items: [
                      {
                        type: 'question',
                        uuid: '5a37ffb5-b4e2-4cf9-b18f-ecba9807ef51',
                        title: 'Phone Number',
                        response_type: 'number',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
