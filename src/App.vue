<template>
  <div id="app">
    <NavBar/>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
    <MTab class="d-none d-md-flex"/>
    <CarouselM/>
    <TheaterList/>
    <NewShowModal/>
    <b-button v-b-modal.modal-xl variant="primary">xl modal</b-button>

    <FloatingActionButton/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from "@/components/NavBar/NavBar.vue";

import NewShowModal from "@/NewShowModal.vue";
import FloatingActionButton from "@/FloatingActionButton.vue";
import CarouselM from "@/components/Carousel.vue";
import TheaterList from "@/components/TheaterList.vue";
import MTab from "@/MTab.vue";

export default {
  name: 'App',
  components: {
    MTab,
    TheaterList, CarouselM,
    FloatingActionButton,
    NewShowModal,
    HelloWorld,
    NavBar
  },
  data: ()=>{return{
    show: true
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
  max-width: 1120px;

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
