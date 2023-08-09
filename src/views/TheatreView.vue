<template>
  <div style="width: 100vh">

    <div class="d-flex align-items-center w-100 flex-row px-3">


      <b-row class="w-100">
        <hr>
        <h1 class="align-items-start my-3" style="min-width: fit-content; font-size: xxx-large">
          {{ t.name }}
        </h1>
        <span class="d-none  mx-3 d-md-block disabled my-1"> {{ t.place }}</span>
        <hr>

      </b-row>
    </div>
    <b-button class="my-4 mx-4" style="background: saddlebrown" @click="compo=!compo">
      {{ compo ? 'Hide Reviews' : 'Show Review' }}
    </b-button>
    <b-button class="my-4 mx-4" style="background: saddlebrown" @click="appstore.open_review_modal(t.id, 1)">Add your
      review
    </b-button>
    <div v-if="compo">
      <div v-for="r in reviews" :key="r.id" class="card w-100 bg-dark text-light text-warning rounded-5 border-1 py-5"
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
<script>
import {useAppStore} from "@/store";

export default {
  name: 'TheatreView',
  async beforeMount() {
    try { // get theatres
      const response = await fetch(this.appstore.api + "/theatre?id=" + this.$route.params.id, {
        method: 'GET',
        headers: this.appstore.getheader()
      });
      if (response.status === 200) {
        let res = await response.json();
        this.t = res;
        console.log(res)
      } else {
        console.log(response.status, "Failed at Theatre")
      }
    } catch (e) {
      console.log("Failed at Theatre", e)
    }

    try { // get reviews
      const response = await fetch(this.appstore.api + "/review?tid=" + this.t.id, {
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


  },

  data() {
    return {
      t: {

        name: "323",
        place: "32",
        rating: 3,
        comments: [],
      },
      reviews: {},
      appstore: useAppStore(),
      compo: true,
    }
  }
}
</script>