<script>
import {defineComponent} from 'vue'
import MovieCard2 from "@/components/MovieCard2.vue";
import BookingModal from "@/components/BookingModal.vue";
import {useBookingStore} from "@/store/useBookingStore";
import {useAppStore} from "@/store";


export default defineComponent({
  name: "TheaterList",
  components: {BookingModal, MovieCard2},
  data: () => {
    return {
      failed: false,
      app_store: useAppStore(),
      storeX: useBookingStore(),
      loading: false,
      theatre: {},
      order: [],
      loadingTime: 0,
      maxLoadingTime: 3,
    }
  },
  computed: {
    // shows: function (x){
    //   console.log(this.theatre[x].slice(1))
    //   return this.theatre[x].slice(1)
    // }
  },
  watch: {
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval()

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime++
          }, 1000)
        }
      }
    },
    loadingTime(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === this.maxLoadingTime) {
          this.loading = false
        }
      }
    }
  },
  created() {
    this.$_loadingTimeInterval = null
  },
  mounted() {
    this.startLoading()
  },
  methods: {
    clearLoadingTimeInterval() {
      clearInterval(this.$_loadingTimeInterval)
      this.$_loadingTimeInterval = null
    },
    startLoading() {
      this.loading = true
      this.loadingTime = 0
    },
    async loadx() {
      try { // get theatres
        this.loading = true;
        const response = await fetch(this.app_store.api + "/homepage", {
          method: 'GET',
          // headers: this.app_store.getheader()
        });
        if (response.status === 200) {
          let res = await response.json();
          this.theatre = res[0]
          this.order = res[1]
          this.loading = false;
        } else {
          console.log(response.status, "Failed at TheatreList")

          throw new TypeError("Token expired"); // will check for token and push to log in
        }
      } catch (e) {
        console.log("Failed at TheatreList", e)
      }
    },
  },
  beforeMount() {
    this.loadx()
  },
})


</script>

<template>
  <div class="">

    <div class="d-none">
      <div class="d-flex align-items-center mb-3">
        <b-progress :max="maxLoadingTime" class="w-100" height="1.5rem">
          <b-progress-bar :label="`${((loadingTime / maxLoadingTime) * 100).toFixed(2)}%`"
                          :value="loadingTime"></b-progress-bar>
        </b-progress>

        <b-button class="ml-3" @click="startLoading()">Reload</b-button>
      </div>
    </div>
    <!--        <b-skeleton-wrapper :loading="loading">-->
    <!--          <template #loading>-->
    <!--            <b-card>-->
    <!--              <b-skeleton data-bs-theme="dark" height="20%" variant="secondary" width="85%"></b-skeleton>-->
    <!--              <b-skeleton animation="fade" height="150px" type="input" width="55%"></b-skeleton>-->
    <!--              <b-skeleton width="70%"></b-skeleton>-->
    <!--            </b-card>-->
    <!--          </template>-->
    <!--        </b-skeleton-wrapper>-->
    <b-alert v-show="failed" variant="danger">Danger Alert</b-alert>

    <div v-for="n in order" :key="n">
      <hr>
      <div class="d-flex flex-row">
        <h1 class="align-items-start">
          {{ theatre[n][0].name }}
        </h1>
        <b-row>
          <span class="disabled w-75 "> {{ theatre[n][0].place }}</span>

          <b-form-rating v-model="theatre[n][0].rating" class="d-none d-md-block bg-black border-0 w-75 flex-row"
                         color="" data-bs-theme="dark"
                         readonly></b-form-rating>
        </b-row>
      </div>
      <hr>
      <MovieCard2 v-for="m in theatre[n][1]" :key="m.id" :m="m" :t="theatre[n][0]"/>
    </div>
    <BookingModal :show="storeX.show" :theatre="storeX.theatre"/>

  </div>
  <!--d
   // get all theatres of current user,
   // get running shows of current user,
   render lazily
  -->


</template>




