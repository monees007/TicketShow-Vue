<template>
  <div class="DashBoardView" style="min-width: 46vh">
    <b-alert v-if="!appstore.is_logged_in" class="fixed-top d-flex justify-content-between" show variant="warning">You
      are not
      logged in.
      <b-button href="#/login" variant="warning">Click here to login</b-button>
    </b-alert>
    <b-alert v-if="appstore.server_error" class="d-flex justify-content-between" dismissible show variant="danger">
      Server not found
    </b-alert>
    <b-alert v-show="flag_error" ref="flag" show variant="danger">CSV is incorrectly formatted</b-alert>
    <b-row class="mb-3 d-inline-flex w-100 justify-content-between" key-nav>
      <b-button-group class="col">
        <b-button :pressed="activeTab===0" @click="activeTab=0">Shows</b-button>
        <b-button :pressed="activeTab===1" @click="activeTab=1">Theatres</b-button>
      </b-button-group>

      <b-button-group class="col">
        <b-button :pressed="displaymode===0" @click="displaymode=0">
          <b-icon v-if="activeTab===0" icon="table"/>
          <span v-if="activeTab===1" class="">
          Edit Theatre Details
          </span>
        </b-button>
        <b-button :pressed="displaymode===1" @click="displaymode=1">
          <b-icon v-if="activeTab===0" icon="card-image"/>
          <span v-if="activeTab===1">Edit Show Details</span>
        </b-button>
      </b-button-group>

    </b-row>

    <ShowsTableEditor v-if="activeTab===0" :displaymode="displaymode" class=" d-flex "/>
    <TheatresTableEditor v-if="activeTab===1" id="tte" :displaymode="displaymode" class=" d-flex "/>


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
      displaymode: 0,
      flag_error: false,
      separateTheatresToggle: false,
      activeTab: 0,
      value: '',
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
<style scoped>
thead, tbody, tfoot, tr, td, th {
//color: #f8f9fa !important; text-align: left;
}

.form-control {
//color: #f8f9fa !important;

}

@media screen and (min-width: 768px) {
  #tte {
    min-width: 100vh;
    align-items: center;
  }
}

.active {
  background: #4c555d;
}
</style>