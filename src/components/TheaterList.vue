<script>
import {defineComponent} from 'vue'
import MovieCardDark from "@/components/MovieCard-dark.vue";
import {useBookingStore} from "@/store/useBookingStore";
import {useAppStore} from "@/store";
import MovieCardLight from "@/components/MovieCard-light.vue";


export default defineComponent({
  name: "TheaterList",
  components: {MovieCardLight, MovieCardDark},
  data: () => {
    return {
      appstore: useAppStore(),
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
        const response = await fetch(this.appstore.api + "/homepage", {
          method: 'GET',
          headers: this.appstore.getheader()
        });
        if (response.status === 200) {
          let res = await response.json();
          this.theatre = res[0]
          this.order = res[1]
          this.loading = false;
        } else {
          this.loading = false;
          this.appstore.server_error = true
        }
      } catch (e) {
        this.loading = false;
        this.appstore.server_error = true
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
    <!--    <b-skeleton-wrapper :loading="loading">-->
    <!--      <template #loading>-->
    <!--        <b-card>-->
    <!--          <b-skeleton data-bs-theme="dark" height="20%" variant="secondary" width="85%"></b-skeleton>-->
    <!--          <b-skeleton animation="fade" height="150px" type="input" width="55%"></b-skeleton>-->
    <!--          <b-skeleton width="70%"></b-skeleton>-->
    <!--        </b-card>-->
    <!--      </template>-->
    <!--    </b-skeleton-wrapper>-->
    <div v-for="n in order" :key="n" :data-bs-theme="appstore.app_theme" class="bg-secondary rounded-5 py-3 px-1 mb-5">
      <div class="d-flex flex-column align-items-start px-5 pt-4">
        <h1 class="align-items-start " style="font-size: xx-large;">
          {{ theatre[n][0].name }}
        </h1>
        <div class="d-flex justify-content-start w-auto">
          <span class="disabled w-auto ">{{ theatre[n][0].place }}</span>
          <b-form-rating v-model="theatre[n][0].rating" :data-bs-theme="appstore.app_theme"
                         class="bg-black border-0 mx-3 flex-row"
                         color="golden"
                         readonly style="max-width: 125px"></b-form-rating>
        </div>
      </div>
      <div v-if="appstore.app_theme==='dark'">
        <MovieCardDark v-for="m in theatre[n][1]" :key="m.id" :m="m" :t="theatre[n][0]"/>

      </div>
      <div v-if="appstore.app_theme==='light'">
        <MovieCardLight v-for="m in theatre[n][1]" :key="m.id" :m="m" :t="theatre[n][0]"/>
      </div>

    </div>
    <!--    <BookingModal :show="storeX.show" :theatre="storeX.theatre"/>-->

  </div>
  <!--d
   // get all theatres of current user,
   // get running shows of current user,
   render lazily
  -->


</template>




