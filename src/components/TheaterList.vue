<script>
import {defineComponent} from 'vue'
import MovieCard from "@/components/MovieCard.vue";

export default defineComponent({
  name: "TheaterList",
  components: {MovieCard},

})


</script>

<template>
  <div  class="container-fluid">
    <h2>Cannaught Place</h2>
    <div class="row flex-nowrap show-list my-3">
      <MovieCard >Book</MovieCard>
      <MovieCard ></MovieCard>
      <MovieCard/>
      <MovieCard/>

      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
      <div class="col-3">
        <div class="card card-block">Card</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.show-list {
  overflow: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.show-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.show-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}


</style>