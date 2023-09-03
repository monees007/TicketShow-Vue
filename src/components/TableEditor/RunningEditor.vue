<template>
  <b-editable-table

      v-model="data"
      :busy="loading"
      :editMode="'row'"
      :fields="fields"
      :rowUpdate="rowUpdate"
      bordered

      class="overflow-x-scroll editable-table table-hover shadow-z-1 "
      :class="appstore.app_theme==='dark'? 'bg-black' : 'bg-light-subtle'"

      :data-bs-theme="appstore.app_theme"

  >
    <template #cell-isActive="data">
      <span v-if="data.value">Yes</span>
      <span v-else>No</span>
    </template>

    <template #table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </template>
    <!--    <template #cell(edit)="data">-->
    <!--      <div v-if="data.isEdit">-->

    <!--        <b-button class="edit-icon bg-danger me-2" @click="handleSubmit">-->
    <!--          <b-icon icon="x-lg"></b-icon>-->
    <!--        </b-button>-->
    <!--        <b-button ref="row_btn" class="edit-icon bg-success" @click="handleSubmit">-->
    <!--          <b-icon icon="save2"></b-icon>-->
    <!--        </b-button>-->
    <!--      </div>-->
    <!--      <BIconPencil-->
    <!--          v-else-->
    <!--          class="edit-icon"-->
    <!--          @click="handleEdit"-->
    <!--      ></BIconPencil>-->
    <!--    </template>-->
    <template #cell(delete)="data">
      <BIconTrash
          class="remove-icon"
          @click="handleDelete(data)"
      ></BIconTrash>
    </template>
    <template #cell(index)="data">
      {{ data.index + 1 }}
    </template>
  </b-editable-table>
</template>
<script>
import BEditableTable from "bootstrap-vue-editable-table"
import {useAppStore} from "@/store";
import App from "@/App.vue";

export default {
  name: 'RunningEditor',
  components: {BEditableTable},
  data: () => {
    return {
      fields: [
        {key: "delete", label: ""},
        {key: 'index', class: 'id-col'},
        {key: "show_id", label: "Show ID", type: "text",},
        {key: "show_name", label: "Show Name", type: "text",},
        {key: "start", label: "Start", type: "text",},
        {key: "end", label: "End", type: "text",},
        {key: "ticket_price", label: "Ticket Price", type: "text"},
        {key: "format", label: "Format", type: "text"},
        {key: "language", label: "Language", type: "text"},

      ],
      loading: false,
      rowUpdate: {},
      data: {},
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
    async handleSubmit(data, update, repeat = true) {
      this.rowUpdate = {
        edit: false,
        id: data.id,

        action: update ? "update" : "cancel",
      };
      if (update) {
        const rawResponse = await fetch('http://127.0.0.1:4433/api/running?' +
            new URLSearchParams({}), {
              method: 'POST',
              headers: App.$header(),
              body: JSON.stringify(this.data[data.index])
            }
        );
        const content = await rawResponse.json();
        if (repeat) {
          await this.handleSubmit(data, update, repeat = false)
        }
        console.log(content);

      }
    },
    handleEdit(data) {
      this.rowUpdate = {edit: true, id: data.id};
    },
    async handleDelete(data) {
      const rawResponse = await fetch('http://127.0.0.1:4433/api/running?' +
          new URLSearchParams({
            id: data.id
          }), {
            method: 'DELETE',
            headers: App.$header(),
            // body: JSON.stringify(this.storeX.running_list)
          }
      );
      const content = await rawResponse.json();
      console.log(content);
      this.rowUpdate = {id: data.id, action: "delete"};
    },
    async handleSave() {

      const rawResponse = await fetch('http://127.0.0.1:4433/api/bulk/running', {
        method: 'POST',
        headers: App.$header(),
        body: JSON.stringify(this.data)
      });
      const content = await rawResponse.json();

      console.log(content);
    }
  },
  async mounted() {
    await this.update_records()
  },
  props: [
    't_id'
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