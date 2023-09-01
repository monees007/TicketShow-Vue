<template>
  <div class="NavBar">
    <b-navbar :class="appstore.app_theme==='dark'? 'bg-dark-subtle': 'bg-info-subtle' " class="text-primary fixed-top"
              style="justify-content: space-between !important;">
      <b-navbar-nav>
        <b-navbar-brand class="" href="/">
          <img
              class="d-inline-block mx-3"
              src="https://cdn4.iconfinder.com/data/icons/flat-design-development-set-3/24/color-wheel-512.png"
              style="height: 37px">

          <span class="font-monospace" style="font-size: large; font-weight: bold">TicketShow</span>

        </b-navbar-brand>
        <b-col>
          <span class="font-monospace d-none align-bottom d-md-block"
                style="font-size: smaller">{{ appstore.user.email }} <b-icon v-if="appstore.user.role==='admin'"
                                                                             icon="shield-fill-check"/></span>

        </b-col>
      </b-navbar-nav>
      <div class="d-inline-flex align-items-center">

        <b-modal id="modal-lg" v-model="search_not_toggled" cancel-only size="md" static title="Search">
          <template #modal-header>
            <div class="col">
              <h3> Search </h3>
            </div>
            <b-icon icon="x-lg" @click="search_not_toggled=!search_not_toggled"/>
          </template>
          <b-form-input id="searchy" v-model="search_string" :data-bs-theme="appstore.app_theme"
                        class="text-right bg-secondary border-0" placeholder="supports regex"
                        @keyup="do_search">
          </b-form-input>
          <hr class="">
          <b-row v-for="x in result" :key="x.id"
                 class=" py-2 " @click="appstore.router.push((x.director ? '/show/': '/theatre/')+x.id )">
            <b-col class="align-items-start">
              <h3 class="">{{ x.name }}</h3>
              <span class="disabled">{{ x.place || x.director }}</span>
              <hr>
            </b-col>
          </b-row>
          <template #modal-footer>
            <div class="">


            </div>
          </template>
        </b-modal>

        <b-icon :icon="search_not_toggled ?  'x-lg':'search' " class="mx-3 d-sm-inline-block"
                @click="search_not_toggled=!search_not_toggled"></b-icon>
        <b-button :variant="appstore.app_theme==='dark' ? 'dark' : 'warning' " pill @click="appstore.toggle_theme">
          <b-icon :icon="appstore.app_theme==='dark' ? 'moon-stars-fill' :'sun-fill'" aria-hidden="true"></b-icon>
        </b-button>
        <b-button v-b-toggle.sidebar-1 class="mx-2 d-md-none" pill
                  variant="outline-primary">
          <b-icon icon="card-list"/>
        </b-button>
        <b-button v-if="appstore.is_logged_in" class="my-3 d-none mx-3 d-md-block"
                  @click="appstore.logout()">
          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"/>
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
      search_not_toggled: false,
      search_string: "",
      result: [],
    }
  },
  methods: {
    toggle_search() {
      this.search_not_toggled = !this.search_not_toggled
    },
    async do_search() {
      try { // get theatres
        const response = await fetch(this.appstore.api + "/search?search_type=0&search_string=" + this.search_string, {
          method: 'GET',
          // headers: this.appstore.getheader()
        });
        if (response.status === 200) {
          let res = await response.json();
          this.result = res;
          console.log(res)
        } else {
          console.log(response.status, "Failed at TheatreList")

          throw new TypeError("Token expired"); // will check for token and push to log in
        }
      } catch (e) {
        console.log("Failed at TheatreList", e)
      }
    },

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

@media (max-width: 768px) {
  .hide {
    display: none !important;
  }
}
</style>