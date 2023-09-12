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
            :rowUpdate="rowUpdate"
            :filter="filter"
            :head-variant="appstore.app_theme==='dark'? 'dark' : 'secondary'"
            borderless
            class=" editable-table table-hover "
            disableDefaultEdit
            hover
            responsive
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

              <b-button class="edit-icon bg-danger" @click="handleSubmit(data, false)">
                <b-icon icon="x-lg"></b-icon>
              </b-button>
              <b-button ref="row_btn" class="edit-icon bg-success" @click="handleSubmit(data, true)">
                <b-icon icon="save2"></b-icon>
              </b-button>
            </div>
            <b-button v-if="!data.isEdit" v-b-tooltip.hover class="mx-2" pill title="Edit Row"
                      @click="handleEdit(data)">
              <font-awesome-icon :icon="['fas', 'pen-to-square']"/>
            </b-button>
            <b-button v-if="!data.isEdit" v-b-tooltip.hover pill title="Delete Row" @click="handleDelete(data)">
              <font-awesome-icon :icon="['fas', 'trash']"/>
            </b-button>
          </template>

        </b-editable-table>
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
            <b-collapse :id="'acc'+index" accordion="my-accordion" role="tabpanel">
              <RunningEditor ref="running_editor" :filter="filter" :t_id="t.id"/>


            </b-collapse>
          </b-card>


        </div>
      </KeepAlive>
    </Transition>

    <b-modal id="modal-run" body-bg-variant="dark"
             body-text-variant="light"
             data-bs-theme="dark"
             footer-bg-variant="dark"
             footer-text-variant="light"
             header-bg-variant="dark"
             header-text-variant="light"
             size="xl" title="Create">

      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-namet">Show</label>
        </b-col>
        <b-col>
          <b-form-select v-model="selected_show" class="mb-3 input-field bg-dark" size="lg" @change="update_variables">
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
          <b-form-select v-model="temp_run.theatre_id" class="mb-3 input-field bg-dark" size="lg">
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
          <b-form-timepicker v-model="temp_run.start" class="input-field bg-dark" locale="en"></b-form-timepicker>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col>
          <label for="input-capacity">Ending time</label>
        </b-col>
        <b-col sm="9">
          <b-form-timepicker v-model="temp_run.end" class="input-field bg-dark" locale="en"></b-form-timepicker>

        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Language</label>
        </b-col>
        <b-col sm="9">

          <b-form-select v-model="temp_run.language" class="mb-3 input-field bg-dark">
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
                        class="input-field bg-dark"
                        type="number"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Format</label>
        </b-col>
        <b-col sm="9">
          <b-form-select v-model="temp_run.format" class="mb-3 input-field bg-dark text-light">
            <b-form-select-option :value="null" default disabled>Please select the Format</b-form-select-option>

            <b-form-select-option v-for="s in format_list" :key="s" :value="s">{{ s }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <template #modal-footer="{cancel}">
        <b-button size="md" variant="success" @click="createRunning()">
          Add this show
        </b-button>
        <b-button size="md" variant="danger" @click="cancel()">
          Cancel
        </b-button>

      </template>
    </b-modal>

    <b-button-toolbar class="mt-3" key-nav>
      <b-button-group class="mx-1">
        <b-button v-if="displaymode===0" v-b-tooltip.hover class="me-2" pill title="Add Row" variant="secondary"
                  @click="handleAdd()">
          <font-awesome-icon :icon="['fas', 'diagram-next']" rotation="180"/>
        </b-button>
        <b-button v-if="displaymode===0" v-b-tooltip.hover class="me-2" pill title="Reload" variant="danger"
                  @click="update_records">
          <font-awesome-icon :icon="['fas', 'rotate-right']"/>
        </b-button>
        <b-button v-if="displaymode===0" v-b-tooltip.hover
                  :title="synced? 'Synced with server': 'Unsaved Changes. Save to continue' " :variant="synced? 'success' :'warning' " class="me-2" pill
                  @click="handleSave()">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
        </b-button>
      </b-button-group>
      <b-button-group v-if="displaymode===0" class="mx-1">
        <b-button @click="storeX.csvToJson(1)">
          <font-awesome-icon :icon="['fas', 'up-long']"/>
          CSV
          <font-awesome-icon :icon="['fas', 'file-csv']"/>
        </b-button>
        <b-button @click="storeX.jsonToCSV(1)">
          <font-awesome-icon :icon="['fas', 'down-long']"/>
          <font-awesome-icon :icon="['fas', 'file-csv']"/>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import {BSpinner} from "bootstrap-vue";
import {useAppStore} from "@/store";
import {useEditorStore} from "@/store/useEditorStore";
import RunningEditor from "@/components/TableEditor/RunningEditor.vue";
// import {useTableEditorStore} from "@/store/useTableEditorStore";

export default {
  name: 'TheatresTableEditor',
  components: {
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
  },
  methods: {
    async createRunning() {
      console.log(this.temp_run)
      const rawResponse = await fetch(this.appstore.api + '/running', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify(this.temp_run)
      });
      const content = await rawResponse.status;
      await this.$refs.running_editor[0].update_records()

      console.log(content);
    },
    async update_records() {
      this.loading = true;
      await this.storeX.getData(1)
      await this.storeX.getData(2)
      this.loading = false;
      this.synced = true;

    },
    handleAdd() {
      const newId = Date.now();
      this.rowUpdate = {
        edit: true,
        id: newId,
        action: "add",
        // The default add position is at the top of the list. Use the below prop to insert a new row to the very end.
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
              const rawResponse = await fetch(this.appstore.api + '/theater?' +
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

      const rawResponse = await fetch(this.appstore.api + '/bulk/theater', {
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

    }
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

/* -- import Roboto Font ---------------------------- */
//@import "https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic&subset=latin,cyrillic";


//*,
//*:after,
//*:before {
//  -webkit-box-sizing: border-box;
//  -moz-box-sizing: border-box;
//  box-sizing: border-box;
//}


// Material Design shadows
//
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
@table-bg-hover: #7D5260;
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

.b-form-timepicker {
  display: inline-flex;
}

</style>