import {defineStore} from 'pinia'
import {useAppStore} from "@/store/index";

export const useEditorStore = defineStore('EditorStore', {
    state: () => (
        {
            show_list: [],
            theatre_list: null,
            running_list: [],
            selected_show: {},
            selected_theatre: {},
            editorMode: 0,
            appstore: useAppStore(),
            shows_for_theatre: {},
            alert: {
                variant: '',
                content: '',
                click: '',
                show: true,
            }
        }
    ),
    getters: {},
    actions: {
        set_alert(variant, content, click) {
            this.alert.variant = variant
            this.alert.content = content
            this.alert.click = click
            this.alert.show = true
        },

        async put(endpoint, data) {
            console.log('put-data', data)
            const asd = this.appstore
            try {
                this.loading = true;
                const response = await fetch(asd.api + endpoint, {
                    method: 'PUT',
                    headers: asd.getheader(),
                    body: JSON.stringify(data)
                });
                if (response.status === 200) {
                    console.log("Pushed changes to server")
                    return await response.json()
                } else {
                    console.log(response.status, "Failed to push update")
                }
            } catch (e) {
                console.log("Failed to push update ", e)
            }
        },
        async get_shows_of_theatre() {
            const asd = this.appstore
            try {
                this.loading = true;
                const response = await fetch(asd.api + "/bulk/running", {
                    method: 'GET',
                    headers: asd.getheader()
                });
                if (response.status === 200) {
                    this.shows_for_theatre = await response.json()

                } else {
                    console.log(response.status, "Failed to load bulk running")
                }
            } catch (e) {
                console.log("Failed to load bulk running ", e)
            }
        },
        async getData(show_or_theatre) {
            const asd = this.appstore
            const steam = (show_or_theatre === 1 ? 'theatre' : show_or_theatre === 2 ? 'running' : 'shows')
            try {
                this.loading = true;
                const response = await fetch(asd.api + "/bulk/" + steam, {
                    method: 'GET',
                    headers: asd.getheader()
                });
                if (response.status === 200) {
                    const res = await response.json();
                    if (show_or_theatre === 1) {
                        this.theatre_list = res
                    } else if (show_or_theatre === 0) {
                        this.show_list = res
                    } else if (show_or_theatre === 2) {
                        this.running_list = res
                    }

                } else {
                    console.log(response.status, "Failed to load bulk " + steam)
                    throw new TypeError("Token expired"); // will check for token and push to log in
                }
            } catch (e) {
                console.log("Failed to load bulk" + steam, e)
            }
        },
        // csvToJson(show_or_theatre) {
        //     var input = document.createElement('input');
        //     input.type = 'file';
        //
        //     input.onchange = e => {
        //
        //         // getting a hold of the file reference
        //         let file = e.target.files[0];
        //
        //         // setting up the reader
        //         let reader = new FileReader();
        //         reader.readAsText(file, 'UTF-8');
        //
        //         // here we tell the reader what to do when it's done reading...
        //         reader.onload = readerEvent => {
        //             let csv = readerEvent.target.result; // this is the content!
        //             let data = require('jquery-csv').toObjects(csv);
        //             console.log(data)
        //             if (show_or_theatre) {
        //                 this.theatre_list = data
        //
        //             } else {
        //                 this.show_list = data
        //             }
        //         }
        //
        //     }
        //
        //     input.click();
        // },

    },
})
