<template>
  <div class="home">
    <CarouselM/>
    <TheaterList/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselM from "@/components/Carousel.vue";
import TheaterList from "@/components/TheaterList.vue";

export default {
  name: 'HomeView',
  components: {
    TheaterList, CarouselM,
  }
}
</script>
<style>
.home{
  max-width: 1120px;
}
</style>