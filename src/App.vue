<template>
  <div id="app">
    <NavBar data-bs-theme="dark"/>

    <b-sidebar id="sidebar-1" bg-variant="black" data-bs-theme="dark" right shadow text-variant="light"
               title="TicketShow">
      <div class="px-3 py-2 ">
        <b-row>
          <b-avatar :href="appstore.is_logged_in ? '#/user': '#/login' "
                    class="d-flex justify-content-center align-items-center mx-3 bg-secondary"
                    style="height: 50px;width: 50px">
            <span style="font-weight: bolder; font-size: x-large">{{ appstore.user.username[0] }}</span>
          </b-avatar>
          <span style="font-size: large">{{ appstore.user.email }}</span>
          <span style="font-size: smaller">{{ appstore.user.role }}</span>
        </b-row>
        <b-list-group class="my-4">

          <b-list-group-item>
            <router-link class="rotate" to="/">HOME</router-link>
          </b-list-group-item>
          <b-list-group-item>
            <router-link class="rotate" to="/bookings">BOOKINGS</router-link>
          </b-list-group-item>
          <b-list-group-item v-if="appstore.user.role==='admin'">
            <router-link class="rotate" to="/dashboard">DASHBOARD</router-link>
          </b-list-group-item>
          <b-list-group-item v-if="appstore.user.role==='admin'">
            <router-link class="rotate" to="/stats">STATS</router-link>
          </b-list-group-item>

        </b-list-group>
        <b-button class="my-1" @click="appstore.logout()"> Logout</b-button>
      </div>
    </b-sidebar>
    <MTab class="d-none d-md-flex"/>
    <NewShowModal v-if="appstore.user.role==='admin'"/>
    <FloatingActionButton v-if="appstore.user.role==='admin'"/>
    <router-view style="padding: 30px"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NewShowModal from "@/components/NewShowModal.vue";
import FloatingActionButton from "@/components/FloatingActionButton.vue";
import MTab from "@/components/MTab.vue";
import {useAppStore} from "@/store";


export default {
  name: 'App',
  components: {
    MTab,
    FloatingActionButton,
    NewShowModal,
    NavBar,

  },
  data: () => {
    return {
      show: true,
      appstore: useAppStore(),
    }
  },
  created() {
    this.appstore.check_for_token()
  }
}
</script>

<style>
#app {
  font-family: Nunito Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f8f9fa;


  overflow-x: hidden;

  margin-top: 80px;

  background: #000;
}

@media (min-width: 768px) {
  #app {
    margin-left: 40px;
  }
}
</style>
