<template>
  <div class="DashBoardView">
    <b-alert ref="flag" v-show="flag_error" show variant="danger">CSV is incorrectly formatted</b-alert>
    <b-button-toolbar key-nav class="mb-3">
      <b-button-group class="col" cols="3" >
        <b-button :pressed="activeTab===0" @click="activeTab=0">Shows</b-button>
        <b-button :pressed="activeTab===1" @click="activeTab=1">Theatres</b-button>
        <b-button :pressed="activeTab===2" @click="activeTab=2">Running</b-button>
      </b-button-group>
      <b-button-group class="col" cols="2">
        <b-button v-show="activeTab===2" :pressed.sync="separateTheatresToggle" class="sm"
                  variant="secondary">Separate Theatres
          <b-icon class="me-2" :icon="separateTheatresToggle ? 'check-square-fill' : 'square'"></b-icon>
        </b-button>

      </b-button-group>
      <b-button-group class="col" cols="3" >
        <b-button :pressed="displaymode===0" @click="displaymode=0">Table</b-button>
        <b-button :pressed="displaymode===1" @click="displaymode=1">Grid</b-button>
        <b-button :pressed="displaymode===2" @click="displaymode=2">CSV</b-button>
      </b-button-group>

    </b-button-toolbar>

    <ShowsTableEditor :displaymode="displaymode" class="rounded-5 d-flex" ref="shows-table" />


    <b-button-toolbar key-nav class="mt-3">
      <b-button-group class="mx-1">
        <b-button class="me-2" @click="$refs['shows-table'].handleAdd()" pill variant="outline-secondary">Add Row</b-button>
        <b-button class="me-2" @click="$refs['shows-table'].update_records()" pill variant="outline-danger">Reset</b-button>
        <b-button class="me-2" @click="$refs['shows-table'].handleSave()" pill variant="outline-success">Save</b-button>
      </b-button-group>
      <b-button-group class="mx-1">
        <b-button @click="$refs['shows-table'].csvToJson()">Upload CSV</b-button>
        <b-button @click="$refs['shows-table'].jsonToCSV()">Download CSV</b-button>
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
      displaymode:0,
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