<template>
  <div id="parent1" class="d-flex position-fixed  align-items-center justify-content-evenly" style="flex-direction:column; height: 100vh; left: 0;width: 50px"  >

    <div class="rotate ">Home</div>
    <div class="rotate act">Bookings</div>
    <div class="rotate ">Dashboard</div>

  </div>

</template>
<script>
export default {
  name: 'MTab'
}
</script>
<style>

.act{

  font-weight: bolder;
  color: #f8f9fa !important;
  text-shadow: #f8f9fa;
}
.tab1{
  min-width: fit-content;
  min-height: fit-content;
}
.rotate:hover{
  color: #f8f9fa;
  text-shadow:1px 1px 4px #fff;}
.rotate{
  font-size: large;
  color: grey;
  vertical-align:top;
  transform:rotate(7deg);
  -ms-transform:rotate(270deg); /* IE 9 */
  -moz-transform:rotate(270deg); /* Firefox */
  -webkit-transform:rotate(270deg); /* Safari and Chrome */
  -o-transform:rotate(270deg); /* Opera */}
</style>