<template>
  <div id="app">
    <NavBar :data-bs-theme="appstore.app_theme"/>

    <Sidebar :appstore="appstore"/>
    <ReviewModal/>

    <MTab v-if="appstore.is_logged_in" class="d-none d-md-flex"/>
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
import Sidebar from "@/components/Sidebar.vue";
import ReviewModal from "@/components/ReviewModal.vue";

export default {
  name: 'App',
  components: {
    ReviewModal,
    Sidebar,
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
  },
  beforeMount() {
    document.body.style.background = this.appstore.app_theme === 'dark' ? '#000' : '#fff';
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

}


@media (min-width: 768px) {
  #app {
    margin-left: 40px;
  }
}
</style>
