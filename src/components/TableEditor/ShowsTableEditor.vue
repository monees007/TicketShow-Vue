<template>
  <div>
    <b-editable-table
        v-model="data"
        :busy="loading"
        :editMode="'row'"
        :fields="fields"
        :rowUpdate="rowUpdate"
        bordered

        data-bs-theme="dark"
        class="editable-table table-hover shadow-z-1 "

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
      <template #cell(edit)="data">
        <div v-if="data.isEdit">

          <b-button @click="handleSubmit(data, false)" class="edit-icon bg-danger me-2"><b-icon icon="x-lg"></b-icon> </b-button>
          <b-button @click="handleSubmit(data, true)" class="edit-icon bg-success"><b-icon icon="save2"></b-icon> </b-button>
        </div>
        <BIconPencil
            v-else
            class="edit-icon"
            @click="handleEdit(data, true)"
        ></BIconPencil>
      </template>
      <template #cell(delete)="data">
        <BIconTrash
            class="remove-icon"
            @click="handleDelete(data)"
        ></BIconTrash>
      </template>
    </b-editable-table>
  </div>

</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import {BSpinner} from "bootstrap-vue";
import App from "@/App.vue";

export default {
  name: 'ShowsTableEditor',
  components: {
    BEditableTable,
    BSpinner,
  },
  methods: {
    csvToJson() {
      var input = document.createElement('input');
      input.type = 'file';

      input.onchange = e => {

        // getting a hold of the file reference
        let file = e.target.files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
          let csv = readerEvent.target.result; // this is the content!
          let data = require('jquery-csv').toObjects(csv);
          console.log(data)
          this.data = data
        }

      }

      input.click();
    },


    jsonToCSV(fileTitle = 'export') {

      const items = this.data
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      const header = Object.keys(items[0])
      let csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/"/g, '')).join(','))
      ].join('\n')
      console.log(csv)
      let exportedFilename = fileTitle + '.csv' || 'export.csv';

      let blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    async update_records() {
      this.loading = true;
      const response = await fetch("http://127.0.0.1:4433/api/shows", App.$header('GET'));
      this.data = await response.json();
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
          name: "",
          // email: "",
          // phone: "",
          image_url: "",
          image_sqr: "",
          tags: "",
          ticket_price: "",
          format: "",
          language: "",
        },
      };
    },
    handleSubmit(data, update) {
      this.rowUpdate = {
        edit: false,
        id: data.id,
        action: update ? "update" : "cancel",
      };
    },
    handleEdit(data) {
      this.rowUpdate = {edit: true, id: data.id};
    },
    handleDelete(data) {
      this.rowUpdate = {id: data.id, action: "delete"};
    },
    async handleSave() {

      const rawResponse = await fetch('http://127.0.0.1:4433/api/shows', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.data)
      });
      const content = await rawResponse.json();

      console.log(content);
    }
  },

  data() {
    return {
      rowUpdate: {},
      fields: [
        {key: "name", label: "Name", type: "text", editable: true},
        {key: "image_url", label: "Poster", type: "url", editable: true},
        {key: "image_sqr", label: "Thumbnail", type: "url", editable: true},
        {key: "tags", label: "Tags", type: "text", editable: true},
        {key: "ticket_price", label: "Ticket Price", type: "text", editable: true},
        {key: "format", label: "Format", type: "text", editable: true},
        {key: "language", label: "Language", type: "text", editable: true},
        {key: "edit", label: ''},
        // {id: 1, key: "name", label: "Name", type: "text", editable: true},
        // {id: 2, key: "email", label: "Email", type: "email", editable: true},
        // {id: 3, key: "phone", label: "Phone", type: "text", editable: true},
        {key: "delete", label: ""},
        {key: "edit", label: ""},
      ],
      data: [],
      loading: false,
    };
  },
  async mounted() {
    await this.update_records()
  },
};
</script>


<style lang="less">
/* -- import Roboto Font ---------------------------- */
@import "https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic&subset=latin,cyrillic";


*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}


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
    background-color:  @table-bg;
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