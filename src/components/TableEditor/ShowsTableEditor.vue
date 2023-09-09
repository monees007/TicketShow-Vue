<template>
  <div class="d-flex flex-column">
    <Transition>
      <KeepAlive>
        <b-editable-table
            v-if="displaymode===0"
            v-model="storeX.show_list"
            :busy="loading"
            :editMode="'row'"
            :fields="fields"
            :rowUpdate="rowUpdate"
            bordered

            class=" editable-table table-hover shadow-z-1 "
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
          <template #cell(edit)="data">
            <div v-if="data.isEdit" :data-bs-theme="appstore.app_theme">

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
          <MovieCard2 v-for="m in storeX.show_list" :key="m.id" :m="m"/>
        </div>
      </KeepAlive>
    </Transition>


    <b-button-toolbar v-if="displaymode===0" :data-bs-theme="appstore.app_theme" class="mt-3" key-nav>
      <b-button-group class="mx-1">
        <b-button v-if="displaymode===0" class="me-2" pill variant="secondary" @click="handleAdd()">
          <font-awesome-icon :icon="['fas', 'diagram-next']" rotation=180/>
        </b-button>
        <b-button class="me-2" pill variant="danger" @click="update_records">
          <font-awesome-icon :icon="['fas', 'rotate-right']"/>
        </b-button>
        <b-button v-if="displaymode===0" class="me-2" pill variant="success" @click="handleSave()">
          <font-awesome-icon :icon="['fas', 'floppy-disk']"/>
        </b-button>
      </b-button-group>
      <b-button-group class="mx-1">
        <b-button @click="storeX.csvToJson(0)">Upload CSV</b-button>
        <b-button @click="storeX.jsonToCSV(0)">Download CSV</b-button>
        <b-button @click="export_csv">Download CSV</b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import {BSpinner} from "bootstrap-vue";
import MovieCard2 from "@/components/MovieCard-dark.vue";
import {useAppStore} from "@/store";
import {useEditorStore} from "@/store/useEditorStore";

export default {
  name: 'ShowsTableEditor',
  components: {
    MovieCard2,
    BEditableTable,
    BSpinner,
  },

  data() {
    return {
      storeX: useEditorStore(),
      appstore: useAppStore(),
      rowUpdate: {},
      fields: [
        {key: "edit", label: ''},
        {key: "delete", label: ""},
        {key: "edit", label: ""},
        {key: 'index', class: 'id-col'},
        {key: "name", label: "Name", type: "text", editable: true,},
        {key: "year", label: "Year", editable: true},
        {key: "director", label: "Director", editable: true},
        {key: "duration", label: "Duration", editable: true},
        {key: "tags", label: "Tags", type: "text", editable: true},
        {key: "ticket_price", label: "Ticket Price", type: "text", editable: true},
        {key: "format", label: "Format", type: "text", editable: true},
        {key: "language", label: "Language", type: "text", editable: true},
        {key: "image_url", label: "Poster", type: "url", editable: true, class: 'link-col'},
        {key: "image_sqr", label: "Thumbnail", type: "url", editable: true, class: 'link-col'},
        {key: "description", label: "Description", editable: true},
      ],
      loading: false,
    };
  },
  methods: {
    download(blob, filename) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    async export_csv() {

      try {
        const target = this.appstore.api + '/export?' +
            new URLSearchParams({
              api: 'shows'
            }) //file
        //const target = `https://SOME_DOMAIN.com/api/data/log_csv?$"queryString"`; //target can also be api with req.query

        fetch(target, {
          method: 'get',
          headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
            "Authentication-Token": this.appstore.auth_token,
          }
        }).then(res => res.blob())
            .then(blob => {
              const link = document.createElement('a');
              let url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", 'export.csv');
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });

      } catch (err) {
        console.log(err)
      }
      // console.log(99, rawResponse);

    },

    async update_records() {
      this.loading = true;
      await this.storeX.getData(0)
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
    },
    async handleSubmit(data, update) {
      this.rowUpdate = {
        edit: false,
        id: data.id,

        action: update ? "update" : "cancel",
      };
      if (update) {
        await this.storeX.put('/shows', data.item)

      }
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
        titleTag: 'Confirm',
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
      const content = await rawResponse.json();

      console.log(content);
    }
  },
  props: {
    displaymode: null,
  },
  async mounted() {
    await this.update_records()
  },

};
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
  scrollbar-color: red orange;
  scrollbar-width: thin;
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