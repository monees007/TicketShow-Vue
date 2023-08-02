<script>
export default {
  name: "MovieCard2",
  props:['m']
}
</script>

<template>
  <div id="bright" class="movie_card">
    <div class="info_section d-flex flex-column">
      <div class="movie_header">
        <img class="locandina"
             :src="m.image_url"/>
        <div class="d-flex flex-column align-items-start">
          <h1 style="text-wrap: nowrap; overflow: hidden">{{ m.name }}</h1>
          <h4>{{m.year}}, {{ m.director}}</h4>
          <div><span class="minutes">{{ m.format}}</span>
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
        <b-rating class="w-25 rating-el bg-black"  data-bs-theme="dark" inline no-border size="lg" variant=""></b-rating>

        <b-button class="mx-2 btn-outline-secondary btn-dark" data-bs-theme="light">Reviews</b-button>
        <b-button class="me-2" pill size="sm">
          <b-icon icon="pen"/>
        </b-button>
        <b-button class="me-2" pill size="sm">
          <b-icon icon="trash"/>
        </b-button>

      </div>
    </div>
    <div class="blur_back bright_back " style="max-width: fit-content;">
      <img style="    max-height: -webkit-fill-available;"
          :src="m.image_sqr">
    </div>
  </div>
</template>

<style lang="scss">
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

  &:hover {
    transform: scale(1.02);
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
        color: #fff;
        font-weight: 400;
      }

      h4 {
        color: #9ac7fa;
        font-weight: 400;
      }

      .minutes {
        display: inline-block;
        margin-top: 10px;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.13);
      }

      .type {
        display: inline-block;
        color: #cee4fd;
        margin-left: 10px;
      }

      .locandina {
        position: relative;
        float: left;
        margin-right: 20px;
        height: 150px;
        box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
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
  }

  .movie_desc {
    width: 50%;
  }

  .info_section {
    background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
  }

  .blur_back {
    width: 80%;
    background-position: -100% 10% !important;
  }
}

@media screen and (max-width: 768px) {
  .movie_card {
    width: 97%;
    //margin: 70px auto;
    min-height: 350px;
    height: auto;
  }

  .blur_back {
    width: 100%;
    background-position: 50% 50% !important;
  }

  .movie_header {
    width: 100%;
    //margin-top: 85px;
  }

  .movie_desc {
    width: 100%;
  }
  .rating-el{
    min-width: 120px;
    padding: 7px;
    max-height: 4px;
  }
  .text_el{
    min-width: 90%;
  }
  .info_section {
    background: linear-gradient(to top, rgb(20, 20, 19) 50%, transparent 100%);
    display: inline-grid;
  }
}


#bright {
  box-shadow: 0px 0px 150px -45px rgba(255, 51, 0, 0.5);

  &:hover {
    box-shadow: 0px 0px 120px -55px rgba(255, 51, 0, 0.5);
  }
}

.bright_back {
  background: url("https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg");
}

#tomb {
  box-shadow: 0px 0px 150px -45px rgba(19, 160, 134, 0.6);

  &:hover {
    box-shadow: 0px 0px 120px -55px rgba(19, 160, 134, 0.6);
  }
}

.tomb_back {
  background: url("https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png");
}

#ave {
  box-shadow: 0px 0px 150px -45px rgba(199, 147, 75, 0.7);
  margin-bottom: 200px;

  &:hover {
    box-shadow: 0px 0px 120px -55px rgba(199, 147, 75, 0.7);
  }
}

.ave_back {
  background: url("https://www.gannett-cdn.com/-mm-/c03fd140debe8ad4c05cf81a5cad7ad61a12ce52/c=0-1580-2985-3266&r=x803&c=1600x800/local/-/media/2017/06/09/USATODAY/USATODAY/636326272873599176-Black-Panther-Teaser.jpg");
}
</style>