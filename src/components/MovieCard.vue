<template>
  <div class="col-5" style="min-width: 350px">
    <div class="bg-secondary text-white rounded-5 pt-4 px-2" style="max-width: 20rem">
      <h4>The man who knew infinity</h4>
      <span class="disabled ">Dev Patel</span>
      <b-form-rating id="rating-inline" class="bg-secondary border-0" color="white" inline
                     value="4"></b-form-rating>
      <b-button href="#" variant="outline-secondary" ><slot></slot></b-button>
      <img class="rounded-top-5"
           src="https://m.media-amazon.com/images/M/MV5BMTU3Njg4MDM3OV5BMl5BanBnXkFtZTgwMjE5ODM3ODE@._V1_.jpg"
           style="max-width: 75%; margin-top: 10px">
    </div>
  </div>
</template>
<script>
export default {
  name: 'MovieCard'
}
</script>