<template>
  <div :data-bs-theme="appstore.app_theme" class="DashBoardView" style="min-width: 46vh">
    <b-alert v-if="!appstore.is_logged_in" class="fixed-top d-flex justify-content-between" show variant="warning">You
      are not
      logged in.
      <b-button href="#/login" variant="warning">Click here to login</b-button>
    </b-alert>
    <b-alert v-if="appstore.server_error" class="d-flex justify-content-between" dismissible show variant="danger">
      Server not found
    </b-alert>
    <b-alert v-show="flag_error" ref="flag" show variant="danger">CSV is incorrectly formatted</b-alert>
    <b-button-group class="col mb-3 w-100" style=" max-width: 988px">
      <b-button :pressed="activeTab===0" class="py-3" @click="activeTab=0">Shows</b-button>
      <b-button :pressed="activeTab===1" class="py-3" @click="activeTab=1">Theatres</b-button>
    </b-button-group>
    <div class="d-flex">

      <b-button-group :class="searching? 'hide':'show'" class="col mb-3">
        <b-button v-if="activeTab===1" :pressed="displaymode===1" style="max-width: max-content" @click="displaymode=1">
          <font-awesome-icon :icon="['fas', 'film']" class="me-2"/>
          Edit Shows
        </b-button>
        <b-button v-if="activeTab===1" :pressed="displaymode===0" style="max-width: max-content" @click="displaymode=0">
          <font-awesome-icon :icon="['fas', 'tent']" class="me-1"/>
          Edit Theatre Details
        </b-button>

      </b-button-group>
      <div :class="searching?'show':''"
           class="d-inline-flex align-items-center border-1  rounded-5 mb-3 bg-primary px-3" style="height: 35px;max-width: 400px;">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" @click="searching=true"/>
        <b-input id="search-filter" v-model="filter" :class="searching?'': 'hide'" class="border-0 bg-transparent "
                 placeholder="Search"/>
        <font-awesome-icon v-show="searching" :icon="['fas', 'xmark']" @click="searching=false; filter=''"/>
      </div>

    </div>

    <ShowsTableEditor v-if="activeTab===0" :displaymode="displaymode" :filter="filter" class=" d-flex "/>
    <TheatresTableEditor v-if="activeTab===1" id="tte" :displaymode="displaymode" :filter="filter" class=" d-flex "/>


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
      searching: false,
      appstore: useAppStore(),
      displaymode: 1,
      filter: '',
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

#search-filter:focus {
  border-width: 0;
  box-shadow: none;
  outline: 0 none;
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

@media (max-width: 576px) {
  .hide {
    display: none !important;
  }

  .show {
    display: flex !important;
    width: 100vh;
  }
}
</style>