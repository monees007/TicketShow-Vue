<template>
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
          <router-link class="d-none rotate" to="/stats">STATS</router-link>
        </b-list-group-item>

      </b-list-group>
      <b-button class="my-1" @click="appstore.logout()"> Logout</b-button>
    </div>

  </b-sidebar>
</template>
<script>

import {useAppStore} from "@/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',

  data() {
    return {
      appstore: useAppStore(),
    }
  }
}
</script>
<style>

@media (min-width: 768px) {
}
</style>