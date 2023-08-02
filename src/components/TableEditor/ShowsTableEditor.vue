<template>
  <div>
    <Transition>
      <KeepAlive>
        <b-editable-table
            v-if="displaymode===0"
            v-model="rows"
            :busy="loading"
            :editMode="'row'"
            :fields="fields"
            :rowUpdate="rowUpdate"
            bordered

            class=" editable-table table-hover shadow-z-1 "
            data-bs-theme="dark"

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

              <b-button class="edit-icon bg-danger me-2" @click="handleSubmit(data, false)">
                <b-icon icon="x-lg"></b-icon>
              </b-button>
              <b-button ref="row_btn" class="edit-icon bg-success" @click="handleSubmit(data, true)">
                <b-icon icon="save2"></b-icon>
              </b-button>
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
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-editable-table>
      </KeepAlive>
    </Transition>

    <Transition>
      <KeepAlive>
        <div v-if="displaymode===1" class="">
          <MovieCard2 v-for="m in rows" :key="m.id" :m="m"/>
        </div>
      </KeepAlive>
    </Transition>

    <Transition>
      <KeepAlive>
        <div v-if="displaymode===2" class="d-flex flex-wrap">
          <div v-for="r in rows" :key="r.id" class="card bg-dark-subtle border-0 text-white mx-3 my-3"
               data-bs-theme="dark" style="min-width: 18rem; min-height: 30rem">
            <b-overlay bg-color="dark" data-bs-theme="dark" no-center opacity="1" rounded="sm" show>
              <template #overlay>

                <b-icon

                    class="position-absolute"
                    scale="2"
                    shift-h="8"
                    shift-v="8"
                    style="top: 0; right: 0"
                ></b-icon>
              </template>
              <b-img :src="r.image_url" alt="Card image" class="card-image-top" fluid
                     style="max-width: 23rem;    background:rgba(0,0,0,0.6);"/>
            </b-overlay>
            <div class="card-img-overlay border-0" style="z-index: 11;">
              <h1 class="card-title">{{ r.name }}</h1>
              <span v-for="t in r.tags.split()" :key="t" class="badge bg-secondary-subtle">{{ t }}</span>
              <div class="input-group mb-3">
                <b-input :value="r.format" prepend="" type="text"/>
                <b-input :value="r.language" prepend="" type="text"/>
              </div>
              <b-textarea v-model="r.image_sqr" class="card-text mb-3"/>

              <div class="input-group mb-3 d-inline-flex">
                <div class="input-group-prepend d-inline-flex">
                  <span class="input-group-text">Ticket Price</span>
                  <span class="input-group-text">₹</span>
                </div>
                <b-input :value="r.ticket_price" prepend="Ticket Price" type="text"/>
              </div>


            </div>
          </div>
        </div>
      </KeepAlive>
    </Transition>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import {BSpinner} from "bootstrap-vue";
import App from "@/App.vue";
import MovieCard2 from "@/components/MovieCard2.vue";
import router from "@/router";

export default {
  name: 'ShowsTableEditor',
  components: {
    MovieCard2,
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
          this.rows = data
        }

      }

      input.click();
    },
    jsonToCSV(fileTitle = 'export') {

      const items = this.rows
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
      try {
        this.loading = true;
        const response = await fetch("http://127.0.0.1:4433/api/bulk/shows", {
          method: 'GET',
          headers: App.$header('GET')
        });
        console.log(response.status)
        if (response.status === 200) {
          this.rows = await response.json();
          this.loading = false;
        } else {
          throw new TypeError("Token expired"); // will check for token and push to log in
        }
      } catch (e) {
        App.$next = router.currentRoute.path
        router.push({path: 'login'})
      }


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
          image_url: "",
          image_sqr: "",
          tags: "",
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
        const rawResponse = await fetch('http://127.0.0.1:4433/api/shows?' +
            new URLSearchParams({
              id: data.id
            }), {
              method: 'PUT',
              headers: App.$header(),
              body: JSON.stringify(this.rows[data.index])
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
      const rawResponse = await fetch('http://127.0.0.1:4433/api/shows?' +
          new URLSearchParams({
            id: data.id
          }), {
            method: 'DELETE',
            headers: App.$header(),
            body: JSON.stringify(this.rows)
          }
      );
      const content = await rawResponse.json();
      console.log(content);
      this.rowUpdate = {id: data.id, action: "delete"};
    },
    async handleSave() {

      const rawResponse = await fetch('http://127.0.0.1:4433/api/bulk/shows', {
        method: 'POST',
        headers: App.$header(),
        body: JSON.stringify(this.rows)
      });
      const content = await rawResponse.json();

      console.log(content);
    }
  },
  props: {
    displaymode: null,
  },

  data() {
    return {

      rowUpdate: {},
      fields: [
        {key: 'index', class: 'id-col'},
        {key: "name", label: "Name", type: "text", editable: true,},
        {key: "image_url", label: "Poster", type: "url", editable: true, class: 'link-col'},
        {key: "image_sqr", label: "Thumbnail", type: "url", editable: true, class: 'link-col'},
        {key: "year", label: "Year", editable: true},
        {key: "description", label: "Description", editable: true},
        {key: "director", label: "Director", editable: true},
        {key: "duration", label: "Duration", editable: true},
        {key: "tags", label: "Tags", type: "text", editable: true},
        {key: "ticket_price", label: "Ticket Price", type: "text", editable: true},
        {key: "format", label: "Format", type: "text", editable: true},
        {key: "language", label: "Language", type: "text", editable: true},
        {key: "edit", label: ''},
        {key: "delete", label: ""},
        {key: "edit", label: ""},
      ],
      rows: [],
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
//@import "https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic&subset=latin,cyrillic";

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