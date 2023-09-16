<script>
import {useAppStore} from "@/store";
import MovieCardDark from "@/components/MovieCard-dark.vue";
import app from "@/App.vue";

export default {
  name: 'ShowView',
  computed: {
    app() {
      return app
    }
  },
  components: {MovieCardDark},
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
        this.m = await response.json();
      } else {
        console.log(response.status, "Failed at TheatreList")

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
        this.reviews = await response.json();
      } else {
        console.log(response.status, "Failed at TheatreList")

      }
    } catch (e) {
      console.log("Failed at TheatreList", e)
    }


  }
}
</script>
<template>
  <div :data-bs-theme="appstore.app_theme">
    <MovieCardDark :m="m"></MovieCardDark>
    <b-button class="my-4 mx-4 btn-secondary border-0 " @click="compo=!compo">
      {{ compo ? 'Hide Reviews' : 'Show Review' }}
    </b-button>
    <b-button class="my-4 mx-4 btn-secondary border-0" @click="appstore.open_review_modal(m.id, 0)">Add your
      review
    </b-button>
    <div v-if="compo">
      <div v-for="r in reviews" :key="r.id"
           class="card w-100   rounded-5 border-0 py-5 my-3"
           style="min-height: 80px; font-style: oblique; font-size: small">
        <span>"{{ r.review }}" </span>
        <b-row class="d-inline">
          <b-rating v-model="r.rating" class="ml-5 border-0" inline variant="warning"></b-rating>
          <span class="small disabled w-50 text-danger"> - {{ r.username || r.email }} </span>

        </b-row>

      </div>
      <b-row>


      </b-row>
    </div>
  </div>

</template>