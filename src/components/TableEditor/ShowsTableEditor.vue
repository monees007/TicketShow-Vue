<template>
  <div class="table-container">
    <b-editable-table
        data-bs-theme="dark"
        v-model="items"
        :editMode="'row'"
        :fields="fields"
        :rowUpdate="rowUpdate"
        bordered
        class="editable-table"
        disableDefaultEdit
    >
      <template #cell(isActive)="data">
        <span v-if="data.value">Yes</span>
        <span v-else>No</span>
      </template>
      <template #cell(edit)="data">
        <div v-if="data.isEdit">
          <BIconX class="edit-icon" @click="handleSubmit(data, false)"></BIconX>
          <BIconCheck
              class="edit-icon"
              @click="handleSubmit(data, true)"
          ></BIconCheck>
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
      <template #cell(name)="data">
        <b-form-input :value="data.value" type="text"></b-form-input>
      </template>
      <template #cell(image_url)="data">
        <b-form-input :value="data.value" type="url"></b-form-input>
      </template>
      <template #cell(image_sqr)="data">
        <b-form-input :value="data.value" type="url"></b-form-input>
      </template>
      <template #cell(ticket_price)="data">
        <b-input-group prepend="₹">
          <b-form-input :value="data.value" prepend="₹" type="number"></b-form-input>
        </b-input-group>
      </template>
      <template #cell(tags)="data">
        <b-form-tags
            v-model="data.value"
            input-id="tags-remove-on-delete"
            remove-on-delete
            separator=" "
        ></b-form-tags>
      </template>
      <template #cell(format)="data">
        <b-form-input v-model="data.value" list="format-list"></b-form-input>

        <datalist id="format-list">
          <option>2D</option>
          <option>3D</option>
          <option>2D IMAX</option>
          <option>HD 3D</option>
        </datalist>

      </template>
      <template #cell(language)="data">
        <b-form-input v-model="data.value" list="language-list"></b-form-input>

        <datalist id="language-list">
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
        </datalist>
      </template>
    </b-editable-table>
    <pre>
      {{ items }}
    </pre>
  </div>
</template>

<script>
import BEditableTable from "bootstrap-vue-editable-table";
import { BIconCheck, BIconPencil, BIconTrash, BIconX,} from "bootstrap-vue";



export default {
  name: 'ShowsTableEditor',
  components: {
    BEditableTable,
    BIconX,
    BIconTrash,
    BIconPencil,
    BIconCheck,

  },
  data() {
    return {
      fields: [
        {key: "delete", label: ""},
        {key: "name", label: "Name"},
        {key: "image_url", label: "Poster"},
        {key: "image_sqr", label: "Thumbnail"},
        {key: "tags", label: "Tags"},
        {key: "ticket_price", label: "Ticket Price"},
        {key: "format", label: "Format"},
        {key: "language", label: "Language"},
        {key: "edit", label: ''},
        {key: "edit", label: ""},
      ],
      items: [
        {
          id: 1,
          name: "Avengers: Endgame",
          image_url: "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/avengers-endgame-et00090482-01-03-2019-06-11-32.jpg",
          image_sqr: "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/avengers-endgame-et00090482-01-03-2019-06-11-32.jpg",
          tags: ["Action", "Adventure", "Fantasy"],
          ticket_price: 500,
          format: "3D",
          language: "English",
        }
      ],
      rowUpdate: {},

    };
  },
  methods: {
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
          image_url: '',
          image_sqr: '',
          tags: '',
          ticket_price: 0.0,
          format: '',
          language: '',
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
    validateName(value) {
      if (value === "") {
        return {
          valid: false,
          errorMessage: "Please enter name",
        };
      }
      return {valid: true};
    },
  },
};
</script>
<style>

.table-container {
  margin: 10px;
}

table.editable-table {
  margin-top: 10px;
}

table.editable-table td {
  vertical-align: middle;
}

.editable-table .data-cell {
  padding: 8px;
  vertical-align: middle;
}

.editable-table .custom-checkbox {
  width: 50px;
}

.remove-icon {
  color: red;
  cursor: pointer;
  font-size: 20px;
}

.edit-icon {
  color: rgb(4, 83, 158);
  cursor: pointer;
  font-size: 20px;
}

.name-col {
  width: 120px;
}

.department-col {
  width: 150px;
}

.age-col {
  width: 100px;
}

.date-col {
  width: 200px;
}

.is-active-col {
  width: 100px;
}
</style>
