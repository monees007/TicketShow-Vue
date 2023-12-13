<template>
  <div class="d-flex flex-column">
    <b-modal id="modelpreview" :data-bs-theme="appstore.app_theme" class=""
             title="Image Preview">
      <template #modal-header="{hide}">
        <span class=" h4">Image Preview</span>
        <b-icon class="" icon="x-lg" @click="hide"/>
      </template>
      <b-img :src="image" alt="Fluid image" class="d-block w-100 h-100" fluid></b-img>
      <template #modal-footer>
      </template>
    </b-modal>

    <Transition>
      <b-card>
        <b-editable-table
            v-model="storeX.$state.show_list"
            :busy="loading"
            :class="appstore.app_theme==='dark'? 'bg-primary' : 'bg-light-subtle'"
            :current-page="currentPage"
            per-page="5"
            :data-bs-theme="appstore.app_theme"
            :editMode="'row'"
            :fields="fields"
            :filter="filter"
            :head-variant="appstore.app_theme==='dark'? 'dark' : 'secondary'"
            :key-field="'id'"
            :rowUpdate="rowUpdate"
            class=" editable-table table-hover border-0"
            disableDefaultEdit
            hover
            responsive
            sort-icon-left
            stacked="sm"
        >
          <template #cell(edit)="data">
            <div v-if="data.isEdit" :data-bs-theme="appstore.app_theme">
              <b-button class="mx-2 edit-button" pill @click="handleSubmit(data, false)">
                <font-awesome-icon :icon="['fas', 'xmark']"/>
              </b-button>
              <b-button class="edit-button" pill @click="handleSubmit(data, true)">
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

          <!--          <template #cell(delete)="data">-->
          <!--            -->
          <!--          </template>-->

          <template #cell(ticket_price)="data">
            <span>₹{{ data.value }}</span>
          </template>
          <template #cell(duration)="data">
            <span>{{ data.value }} min</span>
          </template>
          <template #cell(image_url)="data">
            <b-button v-b-modal.modelpreview @click="image = data.value">
              <b-icon icon="image"></b-icon>
            </b-button>
            <span class="my-2 mx-1">{{ data.value }}</span>
          </template>
          <template #cell(image_sqr)="data">
            <b-button v-b-modal.modelpreview @click="image = data.value">
              <b-icon icon="image"></b-icon>
            </b-button>
            <span class="my-2 mx-1">{{ data.value }}</span>
          </template>
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>


        </b-editable-table>


        <b-button-toolbar :data-bs-theme="appstore.app_theme" class="" key-nav>
          <b-pagination
              id="pagination"
              v-model="currentPage"
              :data-bs-theme="appstore.app_theme"
              :total-rows="storeX.$state.show_list.length"
              align="fill"
              class="my-0 bg-primary text-primary mx-3 mb-3"
              per-page="5"
              size="md"
              style=""
          ></b-pagination>
          <b-button-group class="mx-1 mb-3" key-nav>
            <b-button v-b-tooltip.hover class="me-2" pill title="Add Row" variant="secondary" @click="handleAdd()">
              <font-awesome-icon :icon="['fas', 'diagram-next']" rotation="180"/>
            </b-button>
            <b-button v-b-tooltip.hover class="me-2" pill title="Reload" @click="update_records">
              <font-awesome-icon :icon="['fas', 'rotate-right']"/>
            </b-button>
            <b-button v-b-tooltip.hover :title="synced? 'Synced with server': 'Unsaved Changes. Save to continue' "
                      :variant="synced? 'secondary' :'warning' " class="me-2" pill @click="handleSave()">
              <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
            </b-button>
          </b-button-group>
          <b-button-group class="mx-1 mb-3">
            <DownloadCSV obj="shows" />

          </b-button-group>

        </b-button-toolbar>

      </b-card>
    </Transition>


  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import {BSpinner} from "bootstrap-vue";
import {useAppStore} from "@/store";
import {useEditorStore} from "@/store/EditorStore";
import DownloadCSV from "@/components/TableEditor/DownloadCSV.vue";

export default {
  name: 'ShowsTableEditor',
  components: {
    DownloadCSV,
    BEditableTable,
    BSpinner,
  },

  data() {
    return {
      image: '',
      currentPage: 1,
      storeX: useEditorStore(),
      appstore: useAppStore(),
      rowUpdate: {},
      synced: true,
      fields: [
        {key: "edit", label: ''},
        {key: "name", sortable: true, label: "Name", type: "text", editable: true,},
        {key: "year", sortable: true, label: "Year", type: 'text', editable: true, class: 'year-col'},
        {key: "director", sortable: true, label: "Director", editable: true},
        {key: "duration", label: "Duration", editable: true},
        {key: "tags", sortable: true, label: "Tags", type: "text", editable: true},
        {key: "ticket_price", sortable: true, label: "Ticket Price", type: "text", editable: true},
        {key: "format", sortable: true, label: "Format", type: "text", editable: true},
        {key: "language", sortable: true, label: "Language", type: "text", editable: true},
        {key: "image_url", label: "Poster", type: "url", editable: true, class: 'link-col'},
        {key: "image_sqr", label: "Thumbnail", type: "url", editable: true, class: 'link-col'},
        {key: "description", label: "Description", editable: true, class: 'link-col'},
      ],
      loading: false,
    };
  },
  methods: {

    async update_records() {
      this.loading = true;
      await this.storeX.getData(0)
      this.loading = false;
      this.synced = true;


    },
    handleAdd() {
      const newId = 'abc' + Date.now();
      this.rowUpdate = {
        edit: true,
        id: newId,
        action: "add",
        // The default add position is at the top of the list. Use the below prop to insert a new row to the very end.
        addPosition: "end",
        data: {
          id: newId,
          name: "",
          image_url: "",
          image_sqr: "",
          tags: "",
          ticket_price: "",
          format: "",
          language: "",
          year: '',
          director: '',
          description: '',
          duration: '',
        },

      };
      this.synced = false
    },
    async handleSubmit(data, update) {
      this.rowUpdate = {
        edit: false,
        id: data.id,
        action: update ? "update" : "cancel"
      };
      this.synced = !update
      // this.update_records()
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
              const rawResponse = await fetch(this.appstore.api + '/shows?' +
                  new URLSearchParams({
                    id: data.id
                  }), {
                    method: 'DELETE',
                    headers: this.appstore.getheader(),
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
    async handleSave() {

      const rawResponse = await fetch(this.appstore.api + '/bulk/shows', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify(this.storeX.show_list)
      });
      const content = await rawResponse.status;
      this.update_records()
      this.synced = true

      console.log(content);
    },

  },
  props: ['displaymode', 'filter'],
  async created() {
    await this.update_records()
  },

};
</script>


<style>
.active > .page-link, .page-link.active {
  background-color: #391517 !important;
  border-color: #391517 !important;
}

.page-link {
  background-color: #421821 !important;
  border-color: #421821 !important;
  color: white !important;
}

.page-link:hover {
  background-color: #391517 !important;
  border-color: #391517 !important;

}

@media (min-width: 576px ) {
  #pagination {
    width: 40%;
  }

  .year-col {
    width: 55px !important;
  }

  .link-col {
    max-width: 150px !important;
    overflow: hidden;
  }

  .id-col {
    max-width: 0;
    display: none;
  }
}
</style>