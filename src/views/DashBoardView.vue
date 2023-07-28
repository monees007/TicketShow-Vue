<template>
  <div class="DashBoardView">
    <b-alert v-show="flag_error" show variant="danger">CSV is incorrectly formatted</b-alert>
    <b-button-toolbar key-nav>
      <b-button-group>
        <b-button :pressed="activeTab===0" @click="activeTab=0">Shows</b-button>
        <b-button :pressed="activeTab===1" @click="activeTab=1">Theatres</b-button>
        <b-button :pressed="activeTab===2" @click="activeTab=2">Running</b-button>
      </b-button-group>
      <b-button-group>
        <b-button v-show="activeTab===2" :pressed.sync="separateTheatresToggle" class="mx-3" size="sm"
                  variant="secondary">Separate Theatres
          <b-icon class="me-2" :icon="separateTheatresToggle ? 'check-square-fill' : 'square'"></b-icon>
        </b-button>

      </b-button-group>

    </b-button-toolbar>

    <ShowsTableEditor ref="shows-table" />

    <div class="d-none rounded-5 mt-5">
      <b-table :fields="fields" :items="items">
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
            <option>Kannada</option>
          </datalist>

        </template>
        <template #cell()>
          <b-button variant="outline-danger"><b-icon icon="trash"></b-icon> </b-button>
        </template>
      </b-table>

    </div>
    <b-button-toolbar key-nav>
      <b-button-group class="mx-1">
        <b-button class="me-2" @click="$refs['shows-table'].handleAdd()" pill variant="outline-secondary">Add Row</b-button>
        <b-button class="me-2" @click="$refs['shows-table'].handleSubmit(false)" pill variant="outline-danger">Reset</b-button>
        <b-button class="me-2" @click="$refs['shows-table'].handleSubmit(true)" pill variant="outline-success">Save</b-button>
      </b-button-group>
      <b-button-group class="mx-1">
        <b-button>Upload CSV</b-button>
        <b-button>Download CSV</b-button>
      </b-button-group>
    </b-button-toolbar>

  </div>
</template>

<script>

import ShowsTableEditor from "@/components/TableEditor/ShowsTableEditor.vue";
export default {
  name: 'DashboardView',
  components: {ShowsTableEditor},
  data: () => {
    return {
      flag_error: false,
      separateTheatresToggle: false,
      activeTab: 0,
      value:'',
      fields: [
        {key: "name", label: "Name"},
        {key: "image_url", label: "Poster"},
        {key: "image_sqr", label: "Thumbnail"},
        {key: "tags", label: "Tags"},
        {key: "ticket_price", label: "Ticket Price"},
        {key: "format", label: "Format"},
        {key: "language", label: "Language"},
        {key: "edit", label: ''}
      ],
      items: [
        {age: 40, name: 'Dickerson', department: 'Development', dateOfBirth: '1984-05-20'},
        {age: 21, name: 'Larsen', department: 'Marketing', dateOfBirth: '1984-05-20'},
        {age: 89, name: 'Geneva', department: 'HR', dateOfBirth: '1984-05-20'},
        {age: 38, name: 'Jami', department: 'Accounting', dateOfBirth: '1984-05-20'}
      ],
    }
  }
};

</script>
<style>
thead, tbody, tfoot, tr, td, th {
//color: #f8f9fa !important; text-align: left;
}

.form-control {
//color: #f8f9fa !important;

}

</style>