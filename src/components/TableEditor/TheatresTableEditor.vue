<!--suppress JSCheckFunctionSignatures -->
<template>
  <div class="d-flex flex-column">
    <Transition>
      <b-card v-if="displaymode===0">
        <b-editable-table
            v-model="storeX.theatre_list"
            :busy="loading"
            :class="appstore.app_theme==='dark'? 'bg-black' : 'bg-light-subtle'"
            :data-bs-theme="appstore.app_theme"
            :editMode="'row'"
            :fields="fields"
            :current-page="currentPage"
            per-page="5"
            :rowUpdate="rowUpdate"
            :filter="filter"
            :head-variant="appstore.app_theme==='dark'? 'dark' : 'secondary'"
            borderless
            class=" editable-table table-hover "
            disableDefaultEdit
            hover
            sort-icon-left
            stacked="sm">
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
        <b-button-toolbar :data-bs-theme="appstore.app_theme" class="" key-nav>
          <b-pagination
              id="pagination"
              v-model="currentPage"
              :data-bs-theme="appstore.app_theme"
              :total-rows="storeX.$state.theatre_list.length"
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
            <DownloadCSV obj="shows" />
          </b-button-group>
        </b-button-toolbar>
      </b-card>
    </Transition>

    <Transition>
      <KeepAlive>
        <div v-if="displaymode===1" :data-bs-theme="appstore.app_theme" class="accordion w-100" role="tablist">
          <b-card v-for="(t,index) in storeX.theatre_list" :key="t.id" class="mb-1" no-body>


            <b-card-header v-b-toggle="'acc'+index" class="p-1" header-tag="header" role="tab">
              <div class="d-flex  flex-row px-3">
                <h1 class="align-items-start my-3 " style="min-width: fit-content">
                  {{ t.name }}
                </h1>
                <b-row class="">
                  <span class="d-none mx-3 d-md-block my-4"> {{ t.place }}</span>

                </b-row>
              </div>
            </b-card-header>

            <b-collapse  :id="'acc'+index" accordion="my-accordion" role="tabpanel">
<!--              <component   :is="dynamic_running_editor" v-show="state.index"  :filter="filter" :t_id="t.id" />-->
                  <RunningEditor :ref="'running_editor'+t.id" :t_id="t.id" :filter="filter"></RunningEditor>
            </b-collapse>


          </b-card>


        </div>
      </KeepAlive>
    </Transition>

    <b-modal id="modal-run" :data-bs-theme="appstore.app_theme"
             size="xl" title="Add">
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-namet">Show</label>
        </b-col>
        <b-col>
          <b-form-select :data-bs-theme="appstore.app_theme" v-model="selected_show" class="mb-3 input-field bg-primary" size="lg" @change="update_variables">
            <b-form-select-option :value="null">Please select a Show</b-form-select-option>
            <b-form-select-option v-for="s in storeX.show_list" :key="s.id" :value="s">{{ s.name }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-namet">Theatre Name</label>
        </b-col>
        <b-col>
          <b-form-select :data-bs-theme="appstore.app_theme" v-model="temp_run.theatre_id" class="mb-3 input-field bg-primary" size="lg">
            <b-form-select-option :value="null">Please select a Show</b-form-select-option>
            <b-form-select-option v-for="t in storeX.theatre_list" :key="t.id" :value="t.id">{{ t.name }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Starting time</label>
        </b-col>
        <b-col sm="9">
          <b-form-timepicker v-model="temp_run.start" class="input-field " @input="updateSecondTime" locale="en"></b-form-timepicker>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col>
          <label for="input-capacity">Ending time</label>
        </b-col>
        <b-col sm="9">
          <b-form-timepicker v-model="temp_run.end" class="input-field "  locale="en"></b-form-timepicker>

        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Language</label>
        </b-col>
        <b-col sm="9">

          <b-form-select v-model="temp_run.language" class="mb-3 input-field bg-primary">
            <b-form-select-option :value="null">Please select the Language</b-form-select-option>

            <b-form-select-option v-for="s in language_list" :key="s" :value="s">{{ s }}</b-form-select-option>
          </b-form-select>

        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Ticket Price</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-capacity" v-model="temp_run.ticket_price" :value="selected_show.ticket_price"
                        class="input-field "
                        type="number"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Format</label>
        </b-col>
        <b-col sm="9">
          <b-form-select v-model="temp_run.format" class="mb-3 input-field bg-primary ">
            <b-form-select-option :value="null" default disabled>Please select the Format</b-form-select-option>

            <b-form-select-option v-for="s in format_list" :key="s" :value="s">{{ s }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <template #modal-footer="{cancel, hide}">
        <b-button size="md" variant="success" @click="createRunning(hide,temp_run.theatre_id)">
          Add this show
        </b-button>
        <b-button size="md" variant="danger" @click="cancel()">
          Cancel
        </b-button>

      </template>
    </b-modal>


  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import {BSpinner} from "bootstrap-vue";
import {useAppStore} from "@/store";
import {useEditorStore} from "@/store/EditorStore";
import RunningEditor from "@/components/TableEditor/RunningEditor.vue";
import DownloadCSV from "@/components/TableEditor/DownloadCSV.vue";
/* eslint-disable */

export default {
  name: 'TheatresTableEditor',
  components: {
    DownloadCSV,
    RunningEditor,
    BEditableTable,
    BSpinner,
  },

  props: ['displaymode', 'filter'],
  data() {
    return {
      selected_show: {
        language: '',
        format: '',
        duration: 0
      },
      storeX: useEditorStore(),
      temp_run: {},
      synced: true,
      appstore: useAppStore(),
      rowUpdate: {},
      fields: [
        {key: "edit", label: ''},
        {key: "name", sortable: true, label: "Name", type: "text", editable: true,},
        {key: "place", sortable: true, label: "Place", editable: true},
        {key: "city", sortable: true, label: "City", editable: true},
      ],
      loading: false,
      state: {},
      dynamic_running_editor:null,
      currentPage: null
    };
  },
  computed: {
    language_list() {
      return this.selected_show.language.split(',').map(x => x.trim())
    },
    format_list() {
      return this.selected_show.format.split(',').map(x => x.trim())
    },

  },
  async created() {
    await this.update_records()
    // await this.storeX.get_shows_of_theatre()
  },
  methods: {
    updateSecondTime() {
      if (this.temp_run.start) {
        const firstTime = new Date(this.temp_run.start);
        const secondTime = new Date(firstTime.getTime() + 24 * 60000); // Add 23 minutes
        console.log(secondTime)
        this.temp_run.end = secondTime.toTimeString().substring(0, 8); // Format as HH:MM:SS
      }
    },
    async createRunning(hide, tid) {
      console.log(this.temp_run)
      const rawResponse = await fetch(this.appstore.api + '/running', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify(this.temp_run)
      });
      const content = await rawResponse.status;
      await this.$refs['running_editor'+tid][0].update_records()
      hide()
    },
    async update_records() {
      this.loading = true;
      await this.storeX.getData(1)
      await this.storeX.getData(2)
      this.loading = false;
      this.synced = true;

    },
    handleAdd() {
      const newId = 'abc' + Date.now();
      this.rowUpdate = {
        edit: true,
        id: newId,
        action: "add",
        addPosition: "end",
        data: {
          id: newId,
          name: "",
          place: "",
          city: "",

        },
      };
      this.synced = false
    },
    async handleSubmit(data, update) {
      this.rowUpdate = {
        edit: false,
        id: data.id,

        action: update ? "update" : "cancel",
      };
      this.synced = false

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
              const rawResponse = await fetch(this.appstore.api + '/theatre?' +
                  new URLSearchParams({
                    id: data.id
                  }), {
                    method: 'DELETE',
                    headers: this.appstore.getheader(),
                  }
              );
              const content = await rawResponse.status;
              console.log(content);
              this.rowUpdate = {id: data.id, action: "delete"};
            }
          })
          .catch(err => {
            console.log(err)
          })

    },
    async handleSave() {

      const rawResponse = await fetch(this.appstore.api + '/bulk/theatre', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify(this.storeX.theatre_list)
      });
      const content = await rawResponse.status;

      console.log(content);
    },
    update_variables() {
      this.temp_run.show_name = this.selected_show.name;
      this.temp_run.show_id = this.selected_show.id;
      this.synced = true

    },
  },
};
</script>


<style lang="less">

table.b-table {
  min-width: 100% !important;
}

.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}


.shadow-z-1 {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12),
  0 1px 2px 0 rgba(0, 0, 0, .24);
  -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12),
  0 1px 2px 0 rgba(0, 0, 0, .24);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12),
  0 1px 2px 0 rgba(0, 0, 0, .24);
}


/* -- Material Design Table style -------------- */

// Variables
// ---------------------
@table-header-font-weight: 5000;
@table-header-font-color: #898989;

@table-cell-padding: 1.6rem;
@table-condensed-cell-padding: @table-cell-padding/2;


@table-bg: #171819;
@table-bg-accent: #983423;
@table-bg-hover: #3f1322;
@table-bg-active: @table-bg-hover;
@table-border-color: #e0e0e0;


// Mixins
// -----------------
.transition(@transition) {
  -webkit-transition: @transition;
  -o-transition: @transition;
  transition: @transition;
}

// Tables
//
// -----------------

// Baseline styles
.table {
  margin-bottom: 2rem;
  background-color: @table-bg;;
  //noinspection CssInvalidPropertyValue
  //max-width: -moz-fit-content;
  //max-width: fit-content;
  overflow-x: auto;
  white-space: nowrap;

  > thead,
  > tbody,
  > tfoot {
    > tr {
      .transition(all .3s ease);

      > th,
      > td {
        text-align: left;
        padding: @table-cell-padding;
        vertical-align: top;
        border-top: 0;
        .transition(all .3s ease);
      }
    }
  }

  > thead > tr > th {
    color: @table-header-font-color;
    vertical-align: bottom;
    font-weight: bolder;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
  }

  > caption + thead,
  > colgroup + thead,
  > thead:first-child {
    > tr:first-child {
      > th,
      > td {
        border-top: 0;
      }
    }
  }

  > tbody + tbody {

    border-top: 1px solid rgba(0, 0, 0, .12);
  }

  // Nesting
  .table {
    background-color: @table-bg;
  }

  // Remove border
  .no-border {
    border: 0;
  }
}


// Bordered version
//
// Add horizontal borders between columns.
.table-bordered {
  border: 0;

  > thead,
  > tbody,
  > tfoot {
    > tr {
      > th,
      > td {
        border: 0;
        border-bottom: 1px solid @table-border-color;
      }
    }
  }

  > thead > tr {
    > th,
    > td {
      border-bottom-width: 2px;
    }
  }
}


// Hover effect
//
.table-hover {
  > tbody > tr:hover {
    > td,
    > th {
      background-color: @table-bg-hover;
    }
  }
}


@media (max-width: 576px) {
  .table {
    overflow-x: hidden;

    > tbody,
    > thead,
    > tfoot {
      > tr {
        background: #53F025 !important;
        border-width: 5px;
        width: 100%;
        border-color: #7D5260;
        border-radius: 5px;
        margin-bottom: 5px;
      }
    }
  }
}
.b-form-timepicker {
  display: inline-flex;
}

</style>