<template>
  <div class="d-flex flex-column align-items-center">

  <b-editable-table

      v-model="data"
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

        <b-button class="edit-icon bg-danger" @click="handleSubmit(data, false)">
          <b-icon icon="x-lg"></b-icon>
        </b-button>
        <b-button ref="row_btn" class="edit-icon bg-success" @click="handleSubmit(data, true)">
          <b-icon icon="save2"></b-icon>
        </b-button>
      </div>

      <b-button v-if="!data.isEdit" v-b-tooltip.hover class="mx-2" pill title="Edit Row" @click="handleEdit(data)">
        <font-awesome-icon :icon="['fas', 'pen-to-square']"/>
      </b-button>
      <b-button v-if="!data.isEdit" v-b-tooltip.hover pill title="Delete Row" @click="handleDelete(data)">
        <font-awesome-icon :icon="['fas', 'trash']"/>
      </b-button>

    </template>
  </b-editable-table>
    <div>
      <b-button v-b-modal:modal-run v-b-tooltip.hover class="mb-3 mx-1" pill title="Add">
        <b-icon icon="plus-lg"/>
      </b-button>
      <b-button v-b-tooltip.hover class="mb-3 mx-1" pill title="Reload" @click="update_records">
        <font-awesome-icon :icon="['fas', 'rotate-right']"/>
      </b-button>
    </div>

  </div>
</template>
<script>
import BEditableTable from "bootstrap-vue-editable-table"
import {useAppStore} from "@/store";

export default {
  name: 'RunningEditor',
  components: {BEditableTable},
  data: () => {
    return {
      fields: [
        {key: "edit", label: ""},
        // {key: "show_id", label: "Show ID", type: "text",},
        {key: "show_name", label: "Show Name", type: "text", editable: true, sortable: true},
        {key: "start", label: "Start", type: "text", editable: true, sortable: true},
        {key: "end", label: "End", type: "text", editable: true, sortable: true},
        {key: "ticket_price", label: "Ticket Price", type: "text", editable: true, sortable: true},
        {key: "format", label: "Format", type: "text", editable: true, sortable: true},
        {key: "language", label: "Language", type: "text", editable: true, sortable: true},

      ],
      loading: false,
      rowUpdate: {},
      data: [],
      appstore: useAppStore(),
    }
  },
  methods: {
    async update_records() {
      this.loading = true;

      const asd = this.appstore
      try {
        this.loading = true;
        const response = await fetch(asd.api + "/running?id=" + this.t_id, {
          method: 'GET',
          headers: asd.getheader()
        });
        if (response.status === 200) {
          this.data = await response.json();

        } else {
          console.log(response.status, "Failed to load bulk running")
          throw new TypeError("Token expired"); // will check for token and push to log in
        }
      } catch (e) {
        console.log("Failed to load bulk running ", e)
      }

      this.loading = false;


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
          show_id: "",
          show_name: "",
          theatre_id: "",
          start: "",
          end: "",
          ticket_price: "",
          format: "",
          language: "",

        },
      };
    },
    async handleSubmit(data, update) {
      this.rowUpdate = {
        edit: false,
        id: data.id,

        action: update ? "update" : "cancel",
      };
      const rawResponse = await fetch(this.appstore.api + '/bulk/running', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify(this.data)
      });
      const content = await rawResponse.status;
      this.update_records()
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
    await this.update_records()
  },
  props: [
    't_id', 'filter'
  ]
}
</script>
<style lang="less">


.link-col {
  max-width: 150px !important;
  overflow: hidden;
}

.id-col {
  max-width: 0;
  display: none;
}

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
@table-bg-hover: rgba(0, 0, 0, .12);
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
  width: 100%;
  max-width: 100%;
  margin-bottom: 2rem;
  background-color: @table-bg;
  display: block;
  //noinspection CssInvalidPropertyValue
  max-width: -moz-fit-content;
  max-width: fit-content;
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

</style>