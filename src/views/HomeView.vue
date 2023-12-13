<template>
  <div class="home">
    <b-alert v-if="!appstore.is_logged_in" class="fixed-bottom d-flex justify-content-between shadow" show
             variant="warning">You are not
      logged in.
      <b-button href="#/login" variant="warning">Click here to login</b-button>
    </b-alert>
    <b-alert v-if="appstore.server_error" class="d-flex justify-content-between" show variant="danger">Server not found
    </b-alert>
    <CarouselM class="d-none"/>
    <TheaterList ref="theatre_list"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselM from "@/components/Carousel.vue";
// import {defineAsyncComponent} from "vue";
import {useAppStore} from "@/store";
import TheaterList from "@/components/TheaterList.vue";

export default {
  name: 'HomeView',
  components: {
    TheaterList,

    CarouselM,

  },
  data: () => {
    return {
      appstore: useAppStore(),
    }
  }
}
</script>
<style>
.home{
  max-width: 1120px;
}
</style>