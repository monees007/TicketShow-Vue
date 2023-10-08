import {defineStore} from 'pinia'
import {useAppStore} from "@/store/index";

export const useBookingStore = defineStore('BookingStore', {
    state: () => (
        {
            appstore: useAppStore(),
            count: 123,
            selectedSeats: '',
            show: {},
            theatre: {},
            running:[],
            showModal1: false,
            showModal2: false,
            loading: false,
        }
    ),
    getters: {
        double: state => state.count * 2,
    },
    actions: {
        setValue(t, m) {
            this.theatre = t
            this.show = m
            this.showModal1 = true

        },
        updateSeats(seats) {
            this.selectedSeats = seats
        },
        async load_running() {
            this.loading = true
            try {
                this.loading = true;
                const params = new URLSearchParams();
                params.append('id', this.theatre.id);
                params.append('sid', this.show.id);

                const response = await fetch(this.appstore.api + "/running?" + params.toString(), {
                    method: 'GET',
                    headers: this.appstore.getheader()
                });

                if (response.status === 200) {
                    this.running = await response.json();
                    this.loading = false
                } else {
                    console.log(response.status, "Failed to load bulk running");
                }
            } catch (e) {
                console.log("Failed to load bulk running ", e);
            }

        }
    },
})
