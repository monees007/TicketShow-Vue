<script>
import {defineComponent} from 'vue'
import MovieCard from "@/components/MovieCard.vue";
import {useBookingStore} from "@/store/BookingStore";
import {useAppStore} from "@/store";
import BookingModal from "@/components/Modals/BookingModal.vue";


export default defineComponent({
  name: "TheaterList",
  components: {MovieCard, BookingModal},
  data: () => {
    return {
      appstore: useAppStore(),
      storeX: useBookingStore(),
      loading: true,
      loadingTime: 0,
      maxLoadingTime: 3,
    }
  },
  beforeMount() {
    this.loading = true;
    this.appstore.load_homepage().then(() => {
      this.loading = this.appstore.server_error;
    })

  },
})
</script>
<template>
  <div class="">
    <div v-if="loading" :data-bs-theme="appstore.app_theme"   class="bg-secondary rounded-5 py-3 px-1 mb-5 background1">
      <div class="d-flex flex-column align-items-start px-5 pt-4">
        <b-skeleton  class="h1" height="50px" width="400px"></b-skeleton>
        <div class="d-flex justify-content-start w-auto">
          <b-skeleton  height="25px" width="150px"></b-skeleton>
          <b-skeleton  height="25px"  width="150px"></b-skeleton></div>
        <div class="w-100 d-flex flex-column align-items-center my-5 " >
          <b-skeleton :if="loading" height="350px" width="800px" class="position-relative my-5"></b-skeleton>
          <b-skeleton :if="loading" height="350px" width="800px" class="position-relative my-5"></b-skeleton>

        </div>
      </div>
    </div>
    <div v-for="t in appstore.theatre_list.theatre" :key="t[0].id"
         :data-bs-theme="appstore.app_theme" v-show="t[1].length> 0"
         class="bg-secondary rounded-5 py-3 px-1 mb-5 background1">
      <div class="d-flex flex-column align-items-start px-5 pt-4">
        <h1 class="align-items-start " style="font-size: xx-large;">
          {{ t[0].name }}
        </h1>


        <div class="d-flex justify-content-start w-auto">
          <span class="disabled w-auto ">{{ t[0].place }}</span>
          <b-form-rating v-model="t[0].rating" :data-bs-theme="appstore.app_theme"
                         class="bg-black border-0 mx-3 flex-row"
                         color="golden"
                         readonly style="max-width: 125px"></b-form-rating>
        </div>
      </div>


      <MovieCard v-for="m in t[1]" :key="m.id" :buttons="true"
                 :m="m" :t="t[0]"/>


    </div>
    <BookingModal v-if="!appstore.server_error" :show="storeX.show" :theatre="storeX.theatre"/>
  </div>

</template>


<style scoped>
@media (min-width: 768px) {

  .background1 {
    width: 110vh;
  }
}
</style>

