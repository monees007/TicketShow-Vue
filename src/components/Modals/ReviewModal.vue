<template>
  <div>
    <b-modal v-model="appstore.review_modal.show" :data-bs-theme="appstore.app_theme" class=""
             title="Create Review">
      <template #modal-header>
        <span class=" h4">Create Review</span>
        <b-icon class="" icon="x-lg" @click="appstore.review_modal.show=false"/>
      </template>
      <b-alert v-if="this.error" show variant="danger">Something went wrong. Please try again.</b-alert>

      <b-rating v-model="rating" :variant="check||rating>0? 'warning': 'danger'" class="ml-5 my-2  border-0" inline
                size="lg"></b-rating>
      <b-form-invalid-feedback :state="check || rating>0">
        Please select at least 1 star and give a review to continue.
      </b-form-invalid-feedback>
      <b-form-textarea
          id="textarea"
          v-model="review"
          :state="review.length >= 10 || null"
          max-rows="6"
          placeholder="Enter something..."
          rows="3"
      ></b-form-textarea>
      <b-form-invalid-feedback :state="review.length >= 10 || (review.length === 0 && check)">
        Atleast 10 characters required.
      </b-form-invalid-feedback>
      <template #modal-footer>
        <b-button @click="post">Save Review</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import {useAppStore} from "@/store";
import axios from "axios";

export default {
  name: 'ReviewModal',
  data() {
    return {
      check: true,
      appstore: useAppStore(),
      rating: 0,
      review: '',
      error: false,
    }
  },
  methods: {
    async post() {
      const this2 = this
      if (this.rating === 0 || this.review.length === 0) {
        this.check = this.review.length > 0 && this.rating > 0
      } else {
        await axios.post(this.appstore.api + '/review', {
              show_id: this.appstore.review_modal.show_id,
              theatre_id: this.appstore.review_modal.theatre_id,
              rating: this.rating,
              review: this.review,
            },
            {
              headers: this.appstore.getheader()
            }).then(function (response) {
          if (response.status === 200) {
            console.log(response)
            this2.appstore.reload_reviews()
            this2.appstore.hide_review_modal()
          }


          // router.push({path: '/'})
        }).catch(function (error) {
          console.log(error);
          this2.error = true;
        });
      }
    }
  }
}
</script>
<style>

@media (min-width: 768px) {
}
</style>