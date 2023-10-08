<template>
  <div class="d-flex flex-column align-items-center">

  <b-editable-table

      v-model="storeX.running_list[t_id]"
      :busy="loading"
      :class="appstore.app_theme==='dark'? 'bg-black' : 'bg-light-subtle'"
      :data-bs-theme="appstore.app_theme"
      :editMode="'row'"
      :fields="fields"
      :filter="filter"
      :head-variant="appstore.app_theme==='dark'? 'dark' : 'secondary'"
      :rowUpdate="rowUpdate"
      borderless
      class=" editable-table table-hover "
      hover
      responsive
      sort-icon-left

      stacked="sm"

  >

    <template #cell(ticket_price)="data">
      <span>₹{{ data.value }}</span>
    </template>
    <template #table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </template>
    <template #cell(edit)="data">
      <div v-if="data.isEdit" :data-bs-theme="appstore.app_theme">

        <b-button class="mx-2" pill @click="handleSubmit(data, false)">
          <font-awesome-icon :icon="['fas', 'xmark']"/>
        </b-button>
        <b-button pill @click="handleSubmit(data, true)">
          <font-awesome-icon :icon="['fas', 'check']"/>
        </b-button>
      </div>

      <div v-else>
        <b-button v-if="!data.isEdit" v-b-tooltip.hover class="mx-2" pill title="Edit Row"
                  @click="handleEdit(data)">
          <font-awesome-icon :icon="['fas', 'pen-to-square']"/>
        </b-button>
        <b-button v-if="!data.isEdit" v-b-tooltip.hover pill title="Delete Row" @click="handleDelete(data)">
          <font-awesome-icon :icon="['fas', 'trash']"/>
        </b-button>
        <b-button v-b-tooltip.hover class="mx-2 d-sm-none" pill title="Reload"
                  @click="update_records">
          <font-awesome-icon :icon="['fas', 'rotate-right']"/>
        </b-button>
        <b-button v-b-tooltip.hover
                  :title="synced? 'Synced with server': 'Unsaved Changes. Save to continue' "
                  :variant="synced? 'secondary' :'warning' " class="d-sm-none" pill
                  @click="handleSave()">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
        </b-button>
      </div>

    </template>
  </b-editable-table>
    <div>
      <b-button v-b-modal:modal-run v-b-tooltip.hover class="mb-3 mx-1" pill title="Add">
        <b-icon icon="plus-lg"/>
      </b-button>
      <b-button v-b-tooltip.hover class="mb-3 mx-1" pill title="Reload" @click="update_records">
        <font-awesome-icon :icon="['fas', 'rotate-right']"/>
      </b-button>
      <b-button v-b-tooltip.hover :title="synced? 'Synced with server': 'Unsaved Changes. Save to continue' "
                :variant="synced? 'secondary' :'warning' "
                class="mb-3 mx-1" pill
                @click="handleSave()">
        <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
      </b-button>
    </div>

  </div>
</template>
<script>
import BEditableTable from "bootstrap-vue-editable-table"
import {useAppStore} from "@/store";
import {useEditorStore} from "@/store/EditorStore";

export default {
  name: 'RunningEditor',
  components: {BEditableTable},
  data: () => {
    return {
      fields: [
        {key: "edit", label: ""},
        // {key: "show_id", label: "Show ID", type: "text",},
        {key: "show_name", label: "Show Name", type: "text", editable: true, sortable: true},
        {key: "start", label: "Start", type: "time", editable: true, sortable: true},
        {key: "end", label: "End", type: "time", editable: true, sortable: true},
        {key: "ticket_price", label: "Ticket Price", type: "text", editable: true, sortable: true},
        {key: "format", label: "Format", type: "text", editable: true, sortable: true},
        {key: "language", label: "Language", type: "text", editable: true, sortable: true},

      ],
      loading: false,
      rowUpdate: {},
      data: [],
      synced: true,
      appstore: useAppStore(),
      storeX: useEditorStore(),
    }
  },
  methods: {
    async update_records() {
      this.loading = true;
      await this.storeX.get_shows_of_theatre()
      this.loading = false;


    },
    async handleSubmit(data, update) {
      this.rowUpdate = {
        edit: false,
        id: data.id,

        action: update ? "update" : "cancel",
      };
      this.synced = !update

    },
    async handleSave() {
      const rawResponse = await fetch(this.appstore.api + '/bulk/running', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify(this.storeX.shows_for_theatre)
      });
      const content = await rawResponse.status;
      this.update_records()
      this.synced = true
      console.log(content);
    },

    handleEdit(data) {
      this.rowUpdate = {edit: true, id: data.id};
    },
    async handleDelete(data) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this entry.', {
        title: 'Please Confirm',
        bodyBgVariant: 'dark',

        footerBgVariant: 'dark',
        headerBgVariant: 'dark',
        bodyTextVariant: 'light',
        size: 'sm',
        titleTag: 'div',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true
      })
          .then(async value => {
            if (value) {
              const rawResponse = await fetch(this.appstore.api + '/running?' +
                  new URLSearchParams({
                    id: data.id
                  }), {
                    method: 'DELETE',
                    headers: this.appstore.getheader()
                    // body: JSON.stringify(this.storeX.running_list)
                  }
              );
              const content = await rawResponse.json();
              console.log(content);
              this.rowUpdate = {id: data.id, action: "delete"};
            }
          })
          .catch(err => {
            console.log(err)
          })


    },
  },

  async mounted() {
  },
  props: [
    't_id', 'filter',
  ]
}
</script>
