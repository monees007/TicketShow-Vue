<template>
  <div id="parent1" class="d-flex position-fixed  align-items-center justify-content-evenly"
       style="flex-direction:column; height: 100vh; left: 3px;width: 50px">
    <router-link class="rotate" to="/">HOME</router-link>
    <router-link class="rotate" to="/bookings">BOOKINGS</router-link>
    <router-link v-if="appstore.user.role==='admin'" class="rotate" to="/dashboard">DASHBOARD</router-link>
    <router-link v-if="appstore.user.role==='admin'" class="rotate" to="/stats">STATS</router-link>


  </div>

</template>
<script>
import {useAppStore} from "@/store";

export default {
  name: 'MTab',
  data: () => {
    return {
      appstore: useAppStore(),
    }
  },

}
</script>
<style>

.router-link-exact-active{
  background: #31101d;
  padding: 10px 30px;
  border-radius: 30px;
  width: 180px;
  font-weight: bolder;
  color: #f8f9fa !important;
  text-shadow: #f8f9fa;
}
.tab1{

  min-width: fit-content;
  min-height: fit-content;
}
.rotate:hover{
  background: #7e5260;
  padding: 10px 30px;
  border-radius: 30px;
  width: 180px;
  font-weight: bold;
  color: #f8f9fa;
//text-shadow:1px 1px 4px #fff;}
.rotate{
  font-size: medium;
  width: 180px;
  padding: 10px 30px;
  text-decoration: none;
  color: grey;
  vertical-align:top;
  transform:rotate(7deg);
  -ms-transform:rotate(270deg); /* IE 9 */
  -moz-transform:rotate(270deg); /* Firefox */
  -webkit-transform:rotate(270deg); /* Safari and Chrome */
  -o-transform:rotate(270deg); /* Opera */}
</style>