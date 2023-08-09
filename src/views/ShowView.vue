<script>
import {useAppStore} from "@/store";
import MovieCard2 from "@/components/MovieCard2.vue";

export default {
  name: 'ShowView',
  components: {MovieCard2},
  data() {
    return {
      compo: true,
      m: {},
      reviews: {},
      appstore: useAppStore(),
    }

  },
  async beforeMount() {

    try { // get theatres
      const response = await fetch(this.appstore.api + "/shows?id=" + this.$route.params.id, {
        method: 'GET',
        headers: this.appstore.getheader()
      });
      if (response.status === 200) {
        let res = await response.json();
        this.m = res;
      } else {
        console.log(response.status, "Failed at TheatreList")

        throw new TypeError("Token expired"); // will check for token and push to log in
      }
    } catch (e) {
      console.log("Failed at TheatreList", e)
    }
    try { // get reviews
      const response = await fetch(this.appstore.api + "/review?sid=" + this.m.id, {
        method: 'GET',
        headers: this.appstore.getheader()
      });
      if (response.status === 200) {
        let res = await response.json();
        this.reviews = res;
      } else {
        console.log(response.status, "Failed at TheatreList")

        throw new TypeError("Token expired"); // will check for token and push to log in
      }
    } catch (e) {
      console.log("Failed at TheatreList", e)
    }


  }
}
</script>
<template>
  <div>
    <MovieCard2 :m="m"></MovieCard2>
    <b-button class="my-4 mx-4" style="background: saddlebrown" @click="compo=!compo">
      {{ compo ? 'Hide Reviews' : 'Show Review' }}
    </b-button>
    <b-button class="my-4 mx-4" style="background: saddlebrown" @click="appstore.open_review_modal(m.id, 0)">Add your
      review
    </b-button>
    <div v-if="compo">
      <div v-for="r in reviews" :key="r.id"
           class="card w-100 bg-dark text-light text-warning rounded-5 border-1 py-5 my-3"
           style="min-height: 80px; font-style: oblique; font-size: small">
        <span>"{{ r.review }}" </span>
        <b-row class="d-inline">
          <b-rating v-model="r.rating" class="ml-5 bg-dark border-0" inline variant="warning"></b-rating>
          <span class="small disabled w-50 text-warning"> - {{ r.username || r.email }} </span>

        </b-row>

      </div>
      <b-row>


      </b-row>
    </div>
  </div>

</template>