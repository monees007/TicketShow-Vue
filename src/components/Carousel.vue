<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CarouselM",
  data() {
    return {
      controller_show: false,
      slide: 0,
    }
  }
  ,
  methods: {
    prev() {
      this.$refs.myCarousel.prev()
    }
    ,
    next() {
      this.$refs.myCarousel.next()
    }
  },
  mounted() {
    this.controller_show = true
  }
})


</script>

<template>

  <div class="mx-3 my-3 rounded-5">

    <b-carousel
        id="carousel-fade"
        ref="myCarousel"
        fade
        img-height="280"
        img-width="1024"
        style="text-shadow: 0 0 2px #000; border-radius: 60px !important; overflow: hidden"
    >

    <b-carousel-slide
          caption="First Slide"
          img-src="https://picsum.photos/1024/480/?image=10"
      ></b-carousel-slide>
      <b-carousel-slide
          caption="Second Slide"
          img-src="https://picsum.photos/1024/480/?image=12"
      ></b-carousel-slide>
      <b-carousel-slide
          caption="Third Slide"
          img-src="https://picsum.photos/1024/480/?image=22"
      ></b-carousel-slide>

    </b-carousel>

    <b-button-toolbar v-show="controller_show" id="controller" class="d-none d-md-block">
      <b-button-group class="mr-1">
        <b-button title="Save file" @click="prev">
          <b-icon aria-hidden="true" icon="arrow-left" ></b-icon>
        </b-button>
        <b-button id="pause-button" title="Load file">
          <span>2/3 {{ this.slide }} </span>
        </b-button>
        <b-button title="New document"  @click="next">
          <b-icon aria-hidden="true" icon="arrow-right"></b-icon>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<style scoped>
b-carousel-slide {

  border-radius: 60px !important;
}

#controller {
  display: block;
  position: relative;
  left: 40%;
  z-index: 33;
//top: 40%; bottom: 80px;
}
</style>