<template>
  <div id="app">
    <NavBar :data-bs-theme="appstore.app_theme"/>

    <Sidebar :appstore="appstore"/>
    <ReviewModal/>

    <MTab v-if="appstore.is_logged_in" class="d-none d-md-flex"/>
    <NewShowModal v-if="appstore.user.role==='admin'"/>
    <FloatingActionButton v-if="appstore.user.role==='admin'"/>
    <router-view style="padding: 30px"/>

    <div v-if="!appstore.is_logged_in" id="g_id_onload"
         data-auto_select="true"
         data-callback="handleCredentialResponse"
         data-client_id="519706053397-1739mh8juqvrs4tv89mer3dvdjoshl01.apps.googleusercontent.com"
         data-context="signin"
         data-itp_support="true"
         data-ux_mode="popup"
         style="color-scheme: light !important;">
    </div>
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
import axios from "axios";


function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload)
}

window.handleCredentialResponse = async (response) => {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  console.log(response.credential)
  const responsePayload = decodeJwtResponse(response.credential);
  await axios.post('http://127.0.0.1:4433' + '/login/google', {
        token: response.credential
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
      }).then(function (response) {
    useAppStore().login_with_token(response.data.token, responsePayload)
  }).catch(function (error) {
    console.log(error);
  });

}
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
    this.appstore.toggle_theme()
  },
  beforeMount() {
    document.body.style.background = this.appstore.app_theme === 'dark' ? '#000' : '#fff';
  },

}
</script>

<style>
#app {
  font-family: Nunito Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
  min-height: 100vh;
  margin-top: 80px;
}

@media (min-width: 768px) {
  #app {
    margin-left: 40px;
  }
}
</style>

<style lang="scss">
</style>