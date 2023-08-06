<template>
  <div class="NavBar">
    <b-navbar class="text-primary fixed-top bg-dark-subtle " style="justify-content: space-between !important;">
      <b-navbar-nav>
        <b-navbar-brand class=" text-light" href="#">
          <img
              class="d-inline-block mx-3"
               src="https://cdn4.iconfinder.com/data/icons/flat-design-development-set-3/24/color-wheel-512.png"
               style="height: 37px">

          <span v-show="search_not_toggled" class="font-monospace" style="font-size: large">TicketShow</span>

        </b-navbar-brand>
        <b-col>
          <span v-show="search_not_toggled" class="font-monospace d-none d-md-block"
                style="font-size: smaller">{{ appstore.user.email }} <b-icon v-id="appstore.user.role==='admin'"
                                                                             icon="shield-fill-check"/></span>

        </b-col>
      </b-navbar-nav>
      <div class="d-inline-flex align-items-center">

      <b-input-group v-show="!search_not_toggled" id="search" class="mx-lg-5 bg-secondary text-light d-md-flex" style="max-width: 730px">
        <b-icon class="mx-3" icon="search"></b-icon>
        <b-form-input class="text-right bg-secondary text-light border-0" data-bs-theme="dark"
                      placeholder="search"></b-form-input>
        <b-dropdown class="mx-3 border-0 text-light" data-bs-theme="dark" right text="City" variant="outline">
          <b-dropdown-item>Item 1</b-dropdown-item>
          <b-dropdown-item>Item 2</b-dropdown-item>
          <b-dropdown-item>Item 3</b-dropdown-item>
        </b-dropdown>
      </b-input-group>

        <b-icon @click="search_not_toggled=!search_not_toggled" class="mx-3 d-sm-inline-block d-md-none" :icon="search_not_toggled ? 'search': 'x-lg' "></b-icon>
        <b-button v-show="false && search_not_toggled" data-bs-theme pill variant="outline-secondary">
          <b-icon aria-hidden="true" icon="sun-fill"></b-icon>
        </b-button>
        <b-button v-show="search_not_toggled" v-b-toggle.sidebar-1 class="mx-2 d-md-none" pill
                  variant="outline-primary">
          <b-icon icon="card-list"/>
        </b-button>
        <b-button v-if="appstore.is_logged_in===true" class="my-3 d-none mx-3 bg-dark-subtle d-md-block"
                  @click="appstore.logout()"> Logout
        </b-button>


      </div>


    </b-navbar>
  </div>


</template>

<script>

import App from "@/App.vue";
import {useAppStore} from "@/store";

export default {
  name: 'NavBar',
  computed: {
    App() {
      return App
    }
  },
  data: () => {
    return {
      appstore: useAppStore(),
      search_not_toggled: true
    }
  }
};
</script>

<style scoped>
#search {

  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
@media (max-width:768px){
  .hide{
    display: none !important;
  }
}
</style>