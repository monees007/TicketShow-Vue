<template>
  <div id="app">
    <NavBar/>
    <b-sidebar class id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <nav>
          <router-link v-for="(value,key) in navs" :key="key" :to="key"> {{ value }} </router-link>
        </nav>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
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
    NavBar
  },
  data: ()=>{return{
    show: true,
    navs: {
      '/': 'Home',
      '/bookings': 'Bookings',
      '/dashboard': 'Dashboard',


    }
  }}
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

  background: #171819;
}
@media (min-width:768px){
  #app{
    margin-left: 40px;
  }
}
</style>
