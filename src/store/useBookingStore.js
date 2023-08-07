import {defineStore} from 'pinia'
import {useAppStore} from "@/store/index";

export const useBookingStore = defineStore('BookingStore', {
    state: () => (
        {
            appstore: useAppStore(),
            count: 123,
            selectedSeats: '',
            show: {id: -1, name: '', place: ''},
            theatre: {id: -1, name: '', place: ''},
            showModal1: false,
            showModal2: false,
            running: [],
            bookings: [{}],
        }
    ),
    getters: {
    },
    actions: {
        async setValue(t, m) {
            this.theatre = t
            this.show = m
            const rawResponse = await fetch(this.appstore.api + '/running?' +
                new URLSearchParams({
                    sid: this.show.id,
                    id: this.theatre.id
                }), {
                    method: 'GET',
                    headers: this.appstore.getheader(),

                }
            );
            this.running = await rawResponse.json();

        },
        updateSeats(seats) {
            this.selectedSeats = seats
        },
        async getBookings() {
            const rawResponse = await fetch(this.appstore.api + '/bookings?id=-1', {
                method: 'GET',
                headers: this.appstore.getheader(),

            });
            this.bookings = await rawResponse.json();
        }
    },
})
