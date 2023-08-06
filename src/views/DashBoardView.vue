<template>
  <div class="DashBoardView" style="min-width: 46vh">
    <b-alert v-if="!appstore.is_logged_in" class="d-flex justify-content-between" show variant="warning">You are not
      logged in.
      <b-button href="#/login" variant="warning">Click here to login</b-button>
    </b-alert>
    <b-alert ref="flag" v-show="flag_error" show variant="danger">CSV is incorrectly formatted</b-alert>
    <b-button-toolbar class="mb-3 " key-nav>
      <b-button-group class="col" cols="3" >
        <b-button :pressed="activeTab===0" @click="activeTab=0">Shows</b-button>
        <b-button :pressed1="activeTab===1" @click="activeTab=1">Theatres</b-button>
      </b-button-group>
      <b-button-group class="col" cols="2">
        <b-button v-show="activeTab===2" :pressed.sync="separateTheatresToggle" class="sm"
                  variant="secondary">Separate Theatres
          <b-icon class="me-2" :icon="separateTheatresToggle ? 'check-square-fill' : 'square'"></b-icon>
        </b-button>

      </b-button-group>
      <b-button-group class="col">
        <b-button :pressed="displaymode===0" @click="displaymode=0">
          <b-icon icon="table"/>
        </b-button>
        <b-button :pressed="displaymode===1" @click="displaymode=1">
          <b-icon icon="card-image"/>
        </b-button>
      </b-button-group>

    </b-button-toolbar>

    <ShowsTableEditor v-if="activeTab===0" :displaymode="displaymode" class=" d-flex "/>
    <TheatresTableEditor v-if="activeTab===1" :displaymode="displaymode" class=" d-flex"/>




  </div>
</template>

<script>

import ShowsTableEditor from "@/components/TableEditor/ShowsTableEditor.vue";
import TheatresTableEditor from "@/components/TableEditor/TheatresTableEditor.vue";
import {useAppStore} from "@/store";

export default {
  name: 'DashboardView',
  components: {TheatresTableEditor, ShowsTableEditor},
  data: () => {
    return {
      appstore: useAppStore(),
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