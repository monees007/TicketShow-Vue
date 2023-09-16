<script>

import {useBookingStore} from "@/store/useBookingStore";
import {useAppStore} from "@/store";

export default {
  name: "MovieCardLight",
  data: () => {
    return {
      storeX: useBookingStore()
      ,
      appstore: useAppStore()
    }
  },
  props: ['m', 't'],
  methods: {
    pushr(mid) {
      if (this.appstore.router.currentRoute.path !== '/show/' + mid) {
        this.appstore.router.push('/show/' + mid)
      }
    }
  }
}
</script>

<template>
  <div id="bright" :class="appstore.app_theme==='dark'? 'bg-black' : 'bg-light-subtle'"
       :data-bs-theme="appstore.app_theme"
       class="movie_card "
       @click="pushr(m.id)">
    <div class="info_section d-flex flex-column">
      <div class="movie_header">
        <img :src="m.image_url"
             class="locandina"/>
        <div class="d-flex flex-column align-items-start">
          <h1 style="text-wrap: nowrap; overflow: hidden">{{ m.name }}</h1>
          <h4>{{ m.year }}, {{ m.director }}</h4>
          <div><span class="minutes">{{ m.format }}</span>
            <p class="type">{{ m.tags }}</p></div>

        </div>

      </div>
      <div class="d-flex flex-column text_el align-items-start align-items-sm-center mt-5">
        <p class="text">
          {{ m.description }}
        </p>

      </div>

      <div class="d-flex flex-row mb-3 mx-2">
        <b-rating :value="m.rating" class=" rating-el bg-transparent" disabled inline no-border
                  size="lg"></b-rating>


        <b-button v-b-modal.modal-booking class="mx-2 btn-outline-secondary btn-dark"
                  pill
                  @click="storeX.setValue(t,m)">Book
        </b-button>
        <b-button pill @click="pushr(m.id)">Review</b-button>


      </div>
    </div>
    <div class="blur_back bright_back " style="max-width: fit-content;">
      <!--suppress CssInvalidPropertyValue -->
      <img :src="m.image_sqr"
           style="    max-height: -webkit-fill-available;">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800');

* {
  box-sizing: border-box;
  margin: 0;
}

html, body {
  margin: 0;
  background: black;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.movie_card {
  position: relative;
  display: block;
  width: 800px;
  height: 350px;
  margin: 100px auto;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  box-shadow: 0px 0px 120px -25px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 80px -25px rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
  }

  .info_section {
    position: relative;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;

    .movie_header {
      position: relative;
      padding: 25px;
      height: 40%;

      h1 {
        color: black;
        font-weight: 400;
      }

      h4 {
        color: #9ac7fa;
        font-weight: 400;
      }

      .minutes {
        display: inline-block;
        margin-top: 10px;
        font-weight: 400;
        color: #333;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(100, 100, 0, 0.23);
      }

      .type {
        display: inline-block;
        color: #232353;
        margin-left: 2px;
        text-align: center;
      }

      .locandina {
        position: relative;
        float: left;
        margin-right: 20px;
        height: 120px;
        box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
      }
    }

    .movie_desc {
      padding: 25px;
      height: 50%;

      .text {
        color: #000;
      }
    }

  }

  .blur_back {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    right: 0;
    background-size: cover;
    border-radius: 11px;
  }
}

@media screen and (min-width: 768px) {
  .movie_header {
    width: 60%;
    padding: 25px 25px 0 25px;
  }
  .text {
    width: 50vh;
    margin-top: 20px;
    text-align: left;
  }
  .movie_desc {
    width: 50%;
  }

  .info_section {
    background: linear-gradient(to right, #55e6e6 50%, transparent 100%);
    padding: 20px 0 20px;

  }

  .blur_back {
    width: 80%;
    background-position: -100% 10% !important;
  }
}

@media screen and (max-width: 768px) {
  .movie_card {
    width: 95%;
    margin: 70px auto;
    min-height: auto;
    height: auto;
  }
  .text {
    text-align: center;
  }
;

  .blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .movie_header {
    width: 100%;
    margin: 20px;
  }

  .movie_desc {
    width: 100%;
  }

  .info_section {
    background: linear-gradient(to top, #e5e6e6 50%, transparent 100%);
    display: inline-grid;
  }
}


</style>

