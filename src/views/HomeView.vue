<template>
  <div class="home">
    <CarouselM class=""/>
    <TheatreListAsync/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselM from "@/components/Carousel.vue";
import {defineAsyncComponent} from "vue";

export default {
  name: 'HomeView',
  components: {
    CarouselM,
    TheatreListAsync: defineAsyncComponent(() =>
        import('@/components/TheaterList.vue')
    )
  }
}
</script>
<style>
.home{
  max-width: 1120px;
}
</style>