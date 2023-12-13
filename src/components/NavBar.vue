<template>
  <div class="NavBar">
    <b-modal id="modal-lg" v-model="search_not_toggled" :data-bs-theme="appstore.app_theme" cancel-only size="md" static
             title="Search">
      <template #modal-header>
        <div class="col">
          <h3> Search </h3>
        </div>
        <b-icon icon="x-lg" @click="search_not_toggled=!search_not_toggled"/>
      </template>
      <b-input id="searchy" v-model="search_string" :data-bs-theme="appstore.app_theme" autocomplete="off"
               class="text-right border-0" placeholder="supports regex"
               @keyup="do_search">
      </b-input>
      <hr class="">
      <b-row v-for="(x,index) in result" :key="index"
             class=" py-2 " @click="openpage(x)">
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

    <b-navbar class="text-primary bg-primary fixed-top"
              style="justify-content: space-between !important;">
      <b-navbar-nav>
        <b-navbar-brand class="" href="/">
          <img
              class="d-inline-block mx-3"
              src="https://cdn4.iconfinder.com/data/icons/flat-design-development-set-3/24/color-wheel-512.png"
              style="height: 37px">

          <span class="font-monospace text-light" style="font-size: large; font-weight: bold">TicketShow</span>

        </b-navbar-brand>
        <b-col>
          <span class="font-monospace d-none align-bottom d-md-block"
                style="font-size: smaller">{{ appstore.user.email }} <b-icon v-if="appstore.user.role==='admin'"
                                                                             icon="shield-fill-check"/></span>

        </b-col>
      </b-navbar-nav>
      <div class="d-inline-flex align-items-center">
        <b-dropdown :data-bs-theme="appstore.app_theme" id="dropdown-right" right :text="appstore.city"  class="m-2">
          <b-dropdown-item @click="appstore.setCity('New Delhi')">New Delhi</b-dropdown-item>
          <b-dropdown-item @click="appstore.setCity('Bangalore')">Bangalore</b-dropdown-item>
        </b-dropdown>

        <b-button class="mx-3 d-sm-inline-block" pill @click="search_not_toggled=!search_not_toggled">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg"/>
        </b-button>
        <b-button class="mx-2" pill @click="appstore.toggle_theme">
          <b-icon :icon="appstore.app_theme==='dark' ? 'moon-stars-fill' :'sun-fill'" aria-hidden="true"></b-icon>
        </b-button>
        <b-button v-b-toggle.sidebar-1 class="mx-2 d-md-none" pill
                  variant="">
          <font-awesome-icon :icon="['fas', 'bars']"/>
        </b-button>
        <!--        <b-button v-if="appstore.is_logged_in" class="my-3 d-none mx-3 d-md-block" pill-->
        <!--                  @click="appstore.logout()">-->
        <!--          <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"/>-->
        <!--        </b-button>-->

        <b-avatar v-b-hover="(hover)=>{info=hover}" :data-bs-theme="appstore.app_theme"
                  :href="appstore.is_logged_in ? '': '#/login' "
                  class="d-flex justify-content-center align-items-center mx-3 bg-secondary border-0"
                  style="height: 50px;width: 50px">
          <b-avatar v-b-hover="(hover)=>{info=hover}"
                    :src="appstore.user.profile_pic"
                    class="mx-3" style="font-weight: bolder; font-size: x-large"></b-avatar>

        </b-avatar>
        <div v-show="info && appstore.is_logged_in" v-b-hover="(hover)=>{info=hover}" class=" px-3 py-3"
             style="position: absolute; right: 0px; top:0px; height: 200px; width: 300px">
          <div v-show="info && appstore.is_logged_in" v-b-hover="(hover)=>{info=hover}"
               class="card px-5 py-3"

               style="position: absolute; right: 50px; top:50px; text-align: left">
            <h5>
              <strong>
                {{ appstore.user.name }}
              </strong>
            </h5>
            <span class="disabled small text-danger-emphasis">
        {{ appstore.user.role }}
          </span>
            <p>{{ appstore.user.email }}</p>
            <b-button @click="appstore.logout()">Logout</b-button>
          </div>
        </div>
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
      info: '',
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
        } else {
          console.log(response.status, "Failed at TheatreList")
        }
      } catch (e) {
        console.log("Failed at TheatreList", e)
      }
    },

    openpage(x) {
      this.appstore.router.push((x.director ? '/show/' : '/theatre/') + x.id)
      this.search_not_toggled = !this.search_not_toggled
      this.search_string = ''
      this.result = []
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