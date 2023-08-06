<template>
  <div class="home">
    <b-alert v-if="!appstore.is_logged_in" class="d-flex justify-content-between" show variant="warning">You are not
      logged in.
      <b-button href="#/login" variant="warning">Click here to login</b-button>
    </b-alert>
    <CarouselM class=""/>
    <TheatreListAsync/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselM from "@/components/Carousel.vue";
import {defineAsyncComponent} from "vue";
import {useAppStore} from "@/store";

export default {
  name: 'HomeView',
  components: {

    CarouselM,
    TheatreListAsync: defineAsyncComponent(() =>
        import('@/components/TheaterList.vue')
    )
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