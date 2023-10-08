import {defineStore} from 'pinia'
import axios from "axios";
import router from "@/router";

export const useAppStore = defineStore('AppStore', {
    state: () => (
        {
            app_name: 'TicketShow',
            app_theme: 'light',
            server: 'http://127.0.0.1:4433',
            api: 'http://127.0.0.1:4433/api',
            next_page: '/',
            auth_token: '',
            city: 'New Delhi',
            user: {
                role: '',
                email: '',
                username: '',
                name: '',
                profile_pic: '',
            },
            csrf: '',
            is_logged_in: false,
            server_error: false,
            theatre_list: {
                theatre: [],
                order: [],
            },
            router: router,
            review_id: false,
            review_modal: {
                show: false,
                show_id: -1,
                theatre_id: -1,
            },
            signup_status:0,


        }
    ),
    getters: {
        // next: () => this.next_page.includes('log')?'/':this.next_page,

    },
    actions: {
        setCity(city) {
            this.city = city
            this.load_homepage()
        },
        async load_homepage() {
            console.log('loading homepage')
            try { // get theatres
                const response = await fetch(this.api + "/homepage?city=" + this.city, {
                    method: 'GET',
                    headers: this.getheader()
                });
                if (response.status === 200) {
                    let res = await response.json();
                    this.theatre_list.theatre = res[0]
                    this.theatre_list.order = res[1]
                } else {
                    this.server_error = true
                }
            } catch (e) {
                this.server_error = true
            }
        },
        async login_with_token(token, payload) {
            window.localStorage.setItem("Authentication-Token", token);
            this.auth_token = token
            this.is_logged_in = true
            await this.get_user()
            console.log(payload)
            this.user.name = payload.name
            this.user.profile_pic = payload.picture
            window.localStorage.setItem("username", this.user.name);
            window.localStorage.setItem("profile_pic", this.user.profile_pic);
            console.log('Logged in Successfully')

        },
        toggle_theme() {
            if (this.app_theme === 'dark') {
                this.app_theme = 'light'
            } else {
                this.app_theme = 'dark'
            }
            document.body.style.background = this.app_theme === 'dark' ? '#000' : '#fff';
            document.body.style.color = this.app_theme === 'dark' ? '#fff' : '#000';

        },

        reload_reviews() {
            this.review_id = !this.review_id;
        },
        open_review_modal(rid, show_or_theatre) {

            this.review_modal.show = true;
            if (show_or_theatre) {
                this.review_modal.theatre_id = rid

            } else {
                this.review_modal.show_id = rid

            }
        },
        hide_review_modal() {
            this.review_modal.show = false
        },
        check_for_token() {
            try {
                this.auth_token = window.localStorage.getItem('Authentication-Token');
                this.csrf = window.localStorage.getItem('csrf_token');
                if (this.auth_token) {
                    this.is_logged_in = true
                    console.log('Token Found')
                    this.get_user()

                }
            } catch (e) {
                console.log(e)
                router.push({path: 'login'})
            }
        },
        setValue(t, m) {
            this.theatre = t
            this.show = m

        },
        updateSeats(seats) {
            this.selectedSeats = seats
        },
        async login(email, password,remember) {
            const self = this
            await axios.post(self.server + '/login?&include_auth_token=true', {
                    email: email,
                    password: password,
                    remember: false
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                }).then(function (response) {
                self.auth_token = response.data.response.user['authentication_token']
                self.csrf = response.data.response['csrf_token']
                self.is_logged_in = true
                self.get_user()
                if (self.csrf && self.auth_token && remember) {
                    window.localStorage.setItem("Authentication-Token", self.auth_token);
                    window.localStorage.setItem("csrf_token", self.csrf);
                    console.log('Logged in Successfully')
                }
                router.push('/')

                // router.push({path: '/'})
            }).catch(function (error) {
                console.log(error);
            });
        },
        async signup(email, password) {
            const self = this
            await axios.post(self.server + '/register', {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                }).then(function (response) {
                    self.signup_status = response.status
                    if (response.status === 200){
                        console.log('Signup Successful')
                        self.login(email,password, false)
                    }
                router.push('/')
            }).catch(function (error) {
                console.log(error);
            });
        },
        async get_user() {
            try {
                const rawResponse = await fetch(this.api + '/user',
                    {
                        method: 'GET',
                        headers: this.getheader(),
                    }
                );
                const content = await rawResponse.json();
                this.user.email = content.email
                this.user.role = content.role
                this.user.username = content.username
                this.csrf = window.localStorage.getItem('csrf_token');
                this.user.name = window.localStorage.getItem("username")
                this.user.profile_pic = window.localStorage.getItem("profile_pic")

            } catch (e) {
                console.log(e)
                this.server_error = true
            }

        },
        async logout() {
            const self = this
            await axios.post(this.server + '/logout'
            ).then((response) => {
                if (response.status === 200) {
                    window.localStorage.removeItem("Authentication-Token");
                    window.localStorage.removeItem("csrf_token");
                    window.localStorage.removeItem("profile_pic");
                    window.localStorage.removeItem("username");
                    self.auth_token = ''
                    self.csrf = ''
                    self.is_logged_in = false
                    self.user={}
                    this.user.role = ''
                    if (router.currentRoute.name !== 'home') {
                        router.push('/')
                    }
                    console.log("logout Successful")
                }
            })


        },
        getheader() {
            if (this.is_logged_in && this.auth_token) {
                return {
                    "Content-Type": "application/json", "Authentication-Token": this.auth_token,
                }
            }
            this.next_page = router.currentRoute.path
            router.push({path: 'login'})
        }

    },
})
