<template>
  <div id="app">
    <NavBar data-bs-theme="dark"/>

    <b-sidebar data-bs-theme="dark" id="sidebar-1" class shadow title="Sidebar">
      <div class="px-3 py-2">
        <nav>
        </nav>
        <b-list-group>

          <b-list-group-item data-bs-theme="dark">
            <router-link v-for="(value,key) in navs" :key="key" :to="key"> {{ value }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
    <MTab class="d-none d-md-flex"/>
    <NewShowModal/>
    <FloatingActionButton/>
    <router-view style="padding: 30px"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NewShowModal from "@/components/NewShowModal.vue";
import FloatingActionButton from "@/components/FloatingActionButton.vue";
import MTab from "@/components/MTab.vue";


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

      navs: {
        '/': 'Home',
        '/bookings': 'Bookings',
        '/dashboard': 'Dashboard',


      }
    }
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
