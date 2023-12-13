<!--suppress CssUnusedSymbol -->
<template>
  <div>
    <b-modal id="modal-booking" v-model="storeX.showModal1"
             :data-bs-theme="appstore.app_theme"
             class="d-flex flex-column"
             no-stacking
             size="lg"
             @show="this.storeX.load_running"
    >
      <template #modal-header>
        <span class=" h4">Book Tickets</span>
        <b-icon class="" icon="x-lg" @click="storeX.showModal1=false"/>
      </template>
      <b-alert v-show="booking_successful" show variant="success">Booking Successful</b-alert>
      <b-alert v-show="error" show variant="danger"> Please check all fields</b-alert>
      <b-row>
        <span class="left">Show</span>
        <b-col class="right"><h3> {{ show.name }}</h3>
          <span class="pillx">{{ show.format }}</span>
          <span class="pillx">{{ lang || 'ENG' }}</span>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Theatre</span>
        <b-col class="right">
          <h4 style="max-width: fit-content">{{ theatre.name }} </h4>
          <h5 style="max-width: fit-content">{{ theatre.place }} </h5>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Date</span>
        <b-col class="right d-inline">

          <b-datepicker id="datepicker" v-model="booking.date" :data-bs-theme="appstore.app_theme" :min="new Date()"
                        :class="appstore.app_theme==='dark' ? 'bg-primary': '' " selected-variant="secondary"
                        class="my-2 bg-dark" required></b-datepicker>
        </b-col>

      </b-row>
      <b-row cols="mt-3">
        <span class="left">Slot</span>
        <b-col class="right">
          <div v-if="storeX.loading">
            Loading Slots
            <b-icon animation="spin" class="mt-3" font-scale="2" icon="arrow-clockwise"></b-icon>
          </div>

          <b-form-select v-model="selected_run" :state="is_valid" class="my-2 input-field bg-primary " required
                         @change="booking.rid = selected_run.id"
                         @input="booking.total_price = total_p">
            <b-form-select-option :value="null" default disabled>Please select the show</b-form-select-option>
            <b-form-select-option v-for="r in storeX.running" :key="r.id" :value="r">{{
                'Starting at ' + formatTimeTo12Hour(r.start)
              }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Seats</span>
        <b-col class="right">
          <span v-for="x in (storeX.selectedSeats.split(',').splice(1))" :key="x" class="pillx">{{ x }}</span>
          <b-button :disabled="!selected_run.ticket_price" v-b-modal.modal-multi-2>Select Seats</b-button>
          <span v-show="!selected_run.ticket_price" class="text-warning"> Please select a slot first</span>
        </b-col>

      </b-row>
      <b-row>
        <span class="left">Person</span>
        <b-col class="right my-3">
          <b-form-input v-model="person" min="1" readonly required type="number"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <span class="left">Price</span>
        <b-col :data-bs-theme="appstore.app_theme" class="right my-3 ">
          <b-input-group>
            <div class="input-group-prepend ">
              <div class="input-group-text bg-transparent border-end-0 rounded-end-0">₹</div>
            </div>
            <b-form-input v-model="total_p" class="border-start-0" readonly type="number"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <template #modal-footer="{}">

        <b-button size="md" variant="danger"  @click="storeX.$reset()">
          {{ 'Cancel' }}
        </b-button>
        <b-button size="md" variant="success" @click="booking_successful? storeX.showModal1=false : bookticket()">
          {{ booking_successful ? 'Done' : 'Confirm Booking' }}
        </b-button>
      </template>
    </b-modal>

    <b-modal id="modal-multi-2" v-model="storeX.showModal2"
             :data-bs-theme="appstore.app_theme" ok-only >
      <template #modal-header="{cancel}">
        <span class=" h4">Select seats</span>
        <b-icon v-b-modal.modal-booking class="" icon="x-lg" @click="cancel"/>
      </template>
      <div class="movie-container">


        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>

        <div class="container">
          <div class="screen">Screen this side.</div>

          <div  v-for="j in alphas" :key="j" class="row">
            <div v-for="i in 8" :id="j+i" :key="i"
                 :class="['seat', (selected_run.occupied_seats.includes(''+j+i))? 'occupied': '',(storeX.selectedSeats.includes(''+j+i))? 'selected': ''  ]"
                 @click="seatclick">{{ j + i }}
            </div>

          </div>
          <p class="mt-3">
            <span v-for="x in (storeX.selectedSeats.split(',').splice(1))" :key="x" class="pillx">{{ x }}</span>

          </p>
        </div>

      </div>
      <template #modal-footer="{cancel}">
        <b-button v-b-modal.modal-booking size="md" variant="success" @click="cancel()">
          {{ 'Done' }}
        </b-button>


      </template>
    </b-modal>


  </div>
</template>
<script>
import {useBookingStore} from "@/store/BookingStore";
import {useAppStore} from "@/store";

export default {
  name: 'BookingModal',
  props: ['show', 'theatre'],

  data: () => {
    return {
      is_valid: true,
      selected_run: {
        ticket_price: 0,
        occupied_seats: '',
      },
      booking: {
        total_price: 0,
        person: 1,
        date: null,
      },
      storeX: useBookingStore(),
      appstore: useAppStore(),
      lang: "",


      booking_successful: false,
      error:false,
    }
  },

  computed: {
    alphas: () => {
      return ["A", "B", "C", "D", "E", "F", "G", "H", "I",
        "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"].slice(0, 8)
    },
    total_p() {
      return (this.person * this.selected_run.ticket_price)

    },
    person() {
      return (this.storeX.selectedSeats.split(',').splice(1).length)
    }

  },
  methods: {
    seatclick(e) {
      if (e.target.classList.contains('seat') &&
          !e.target.classList.contains('occupied')) {

        if (e.target.classList.contains('selected')) {
          this.storeX.updateSeats(this.storeX.selectedSeats.replace(',' + e.target.id, ''));
        } else
          this.storeX.updateSeats(this.storeX.selectedSeats + "," + e.target.id)
        e.target.classList.toggle('selected');
      }
    },
    formatTimeTo12Hour(timeString) {
      // eslint-disable-next-line no-unused-vars
      const [hours, minutes, seconds] = timeString.split(':');
      let period = 'AM';

      let hour = parseInt(hours, 10);

      if (hour >= 12) {
        period = 'PM';
        if (hour > 12) {
          hour -= 12;
        }
      } else if (hour === 0) {
        hour = 12; // 0:00:00 should be formatted as 12:00:00 AM
      }

      return `${hour}:${minutes} ${period}`;
    },
    async bookticket() {
      if (this.total_p < 1 || !this.booking.date){
        this.error =true
      }else{
        this.error=false
        const rawResponse = await fetch(this.appstore.api + '/booking', {
          method: 'POST',
          headers: this.appstore.getheader(),
          body: JSON.stringify({
            running_id: this.selected_run.id,
            theatre_name: this.storeX.theatre.name,
            theatre_place: this.storeX.theatre.place,
            show_name: this.selected_run.show_name,
            language: this.selected_run.language,
            format: this.selected_run.format,
            person: this.person,
            date: this.booking.date,
            start: this.selected_run.start,
            end: this.selected_run.end,
            seats: this.storeX.selectedSeats,
            total_price: this.total_p,
          })
        });
        await rawResponse.status;
        const rawResponse2 = await fetch(this.appstore.api + '/running',
            {
              method: 'PATCH',
              headers: this.appstore.getheader(),
              body: JSON.stringify({
                id: this.selected_run.id,
                occupied_seats: this.selected_run.occupied_seats + this.storeX.selectedSeats
              })


            });
        await rawResponse2.status;
        this.booking_successful = true;
        setTimeout(() => {
              this.storeX.$reset()
            },
            3000
        )
      }

    },


  },

}

</script>
<style>

.btn-outline-light {
  color: #a3cfbb !important;
  outline-color: #0a3622;
}

.b-calendar-grid-help {
  background: #121212 !important;
}

.b-calendar-grid {
  width: fit-content !important;
}

#datepicker__dialog_ {
  width: 50%;
}

#datepicker__outer_ {

  display: inline-flex;
}

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
<style>


.container {
  perspective: 1000px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.seat {
  background-color: darkgoldenrod;
  height: 25px !important;
  width: 30px !important;
  margin: 7px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: small;
}

.selected {
  background-color: #0081cb;
}

.occupied {
  background-color: gray;
}

.seat:nth-of-type(2) {
  margin-right: 18px;
}

.seat:nth-last-of-type(2) {
  margin-left: 18px;
}

.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.showcase .seat:not(.occupied):hover {
  cursor: default;
  transform: scale(1);
}

.showcase {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  font-weight: bold;
}

.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

.showcase li small {
  margin-left: 2px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen {
  border: #a3cfbb solid 5px;
  background: #1f1611;
  height: 40px;
  width: 100%;
  margin: 15px 0 50px;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(55, 55, 55, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {

  .seat {
    height: 30px;
    width: 30px !important;
    margin: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bold;

  }
}
</style>