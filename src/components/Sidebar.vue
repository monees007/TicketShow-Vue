<template>
  <b-sidebar id="sidebar-1" bg-variant="primary" class="opacity-100" data-bs-theme="dark" right
             shadow text-variant="light" title="TicketShow"
  >
    <template #header="{ hide }">
      <div class="my-3 d-flex justify-content-between w-100">
        <b-button class="bg-transparent mx-3" @click="hide">
          <font-awesome-icon :icon="['fas', 'xmark']" size="xl"/>
        </b-button>
        <h1>{{ appstore.user.name || 'TicketShow' }}</h1>
      </div>
    </template>
    <div class="px-3 py-2 ">
      <b-row class="align-items-center">
        <b-avatar :data-bs-theme="appstore.app_theme" :href="appstore.is_logged_in ? '#/user': '#/login' "
                  class="d-flex justify-content-center align-items-center mx-3 bg-secondary"
                  style="height: 50px;width: 50px">
          <b-avatar :src="appstore.user.profile_pic" style="font-weight: bolder; font-size: x-large"></b-avatar>

        </b-avatar>
        <span style="font-size: large">{{ appstore.user.email }}</span>
        <span style="font-size: smaller">{{ appstore.user.role }}</span>
      </b-row>
      <b-list-group class="my-4 border-0 bg-transparent">

        <b-list-group-item class="border-0 bg-transparent">
          <router-link class="rotate" to="/">HOME</router-link>
        </b-list-group-item>
        <b-list-group-item class="border-0 bg-transparent">
          <router-link class="rotate" to="/bookings">BOOKINGS</router-link>
        </b-list-group-item>
        <b-list-group-item v-if="appstore.user.role==='admin'" class="border-0 bg-transparent">
          <router-link class="rotate" to="/dashboard">DASHBOARD</router-link>
        </b-list-group-item>
        <b-list-group-item v-if="appstore.user.role==='admin'" class="border-0 bg-transparent">
          <router-link class="rotate" to="/stats">STATS</router-link>
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
<style class="scss">
[data-bs-theme='dark'] {
  --bs-bg-opacity: 1 !important;
}

[data-bs-theme='light'] {
  --bs-bg-opacity: 1 !important;
}

</style>