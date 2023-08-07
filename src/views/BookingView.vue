<script>
import {useBookingStore} from "@/store/useBookingStore";
import {useAppStore} from "@/store";

export default {
  name: 'BookingView',
  async mounted() {

    const rawResponse = await fetch(this.appstore.api + '/booking?id=-1', {
      method: 'GET',
      headers: this.appstore.getheader(),

    });
    this.bookings = await rawResponse.json();

  },


  data() {
    return {
      storeX: useBookingStore(),
      appstore: useAppStore(),
      bookings: []
    }
  }
}
</script>
<template>
  <div class="d-grid">
    <div v-for="b in this.bookings" :key="b.id" class="card bg-dark-subtle py-4 px-4" data-bs-theme="dark">
      <b-row>
        <span class="left">Show</span>
        <b-col class="right"><h3> {{ b.show_name }}</h3>
          <span class="pillx">{{ b.format }}</span>
          <span class="pillx">{{ b.language }}</span>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Theatre</span>
        <b-col class="right">
          <h4 style="max-width: fit-content">{{ b.theatre_name }} </h4>
          <h5 style="max-width: fit-content">{{ b.theatre_place }} </h5>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Date</span>
        <b-col class="right d-inline">

          {{ b.date }}
        </b-col>

      </b-row>
      <b-row cols="mt-3">
        <span class="left">Slot</span>
        <b-col class="right">
          {{ b.start + '-' + b.end }}
        </b-col>
      </b-row>
      <b-row cols="mt-3">
        <span class="left">Total Price</span>
        <b-col class="right ">
          {{ '₹ ' + b.total_price }}
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Seats</span>
        <b-col class="right">
          <span v-for="x in (b.seats.split(',').splice(1))" :key="x" class="pillx">{{ x }}</span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<style>

.left {
  width: 100px;
  margin-right: 10px;
  margin-left: 50px;
}

.right {
  padding-left: 20px;
  border-left: darkcyan dashed 2px;
}

.pillx {
  padding: 3px 5px;
  border-radius: 90px;
  margin: 5px;
  font-weight: bold;
  background: #121212;
}

</style>