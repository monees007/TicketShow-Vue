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

}
</script>

<template>
  <div id="bright" :class="appstore.app_theme==='dark'? 'bg-black' : 'bg-light-subtle'"
       :data-bs-theme="appstore.app_theme"
       class="movie_card ">
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
      <div class="w-50 d-flex flex-column text_el align-items-start align-items-sm-center mt-5">
        <p class="text">
          Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an
          Orc to find a weapon everyone is prepared to kill for.
        </p>

      </div>

      <div class="d-flex flex-row mb-3 mx-3">
        <b-rating :class="appstore.app_theme==='dark'? 'bg-black' : ''" :data-bs-theme="appstore.app_theme"
                  class="w-25 rating-el" inline no-border size="lg" variant=""></b-rating>

        <b-button :data-bs-theme="appstore.app_theme" class="mx-2 btn-outline-secondary btn-dark">Reviews</b-button>
        <b-button v-b-modal.modal-booking :data-bs-theme="appstore.app_theme"
                  class="mx-2 btn-outline-secondary btn-dark"
                  @click="storeX.setValue(t,m)">Book
        </b-button>
        <b-button class="me-2" pill size="sm">
          <b-icon icon="pen"/>
        </b-button>
        <b-button class="me-2" pill size="sm">
          <b-icon icon="trash"/>
        </b-button>

      </div>
    </div>
    <div class="blur_back bright_back " style="max-width: fit-content;">
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
  background: white;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.link {
  display: block;
  text-align: center;
  color: #777;
  text-decoration: none;
  padding: 10px;
}

.movie_card {
  position: relative;
  display: block;
  width: 800px;
  height: 350px;
  margin: 80px auto;
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
        color: #555;
        font-weight: 400;
      }

      .minutes {
        display: inline-block;
        margin-top: 15px;
        color: #555;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }

      .type {
        display: inline-block;
        color: #959595;
        margin-left: 10px;
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
        color: #545454;
      }
    }

    .movie_social {
      height: 10%;
      padding-left: 15px;
      padding-bottom: 20px;

      ul {
        list-style: none;
        padding: 0;

        li {
          display: inline-block;
          color: rgba(0, 0, 0, 0.3);
          transition: color 0.3s;
          transition-delay: 0.15s;
          margin: 0 10px;

          &:hover {
            transition: color 0.3s;
            color: rgba(0, 0, 0, 0.7);
          }

          i {
            font-size: 19px;
            cursor: pointer;
          }
        }
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
    width: 65%;
  }

  .movie_desc {
    width: 50%;
  }

  .info_section {
    background: linear-gradient(to right, #e5e6e6 50%, transparent 100%);
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
    min-height: 350px;
    height: auto;
  }

  .blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .movie_header {
    width: 100%;
    margin-top: 85px;
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

