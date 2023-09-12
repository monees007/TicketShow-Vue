import {defineStore} from "pinia";
import {useAppStore} from "@/store/index";

export const useEditorStore = defineStore('EditorStore', {
    state: () => (
        {
            show_list: [],
            theatre_list: [],
            running_list: [],
            selected: {
                s: {},
                t: {},
            },
            selected_theatre: {},
            editorMode: 0,
            appstore: useAppStore(),
            shows_for_theatre: {}
        }
    ),
    getters: {},
    actions: {
        async get_data(show_or_theatre) {
            const asd = this.appstore
            const steam = (show_or_theatre === 1 ? 'theatre' : show_or_theatre === 2 ? 'running' : 'shows')
            try {
                this.loading = true;
                const response = await fetch(asd.api + "/bulk/" + steam, {
                    method: 'GET',
                    headers: asd.getheader()
                });
                if (response.status === 200) {
                    if (show_or_theatre === 1) {
                        this.theatre_list = await response.json();
                    } else if (show_or_theatre === 0) {
                        this.show_list = await response.json();
                    } else if (show_or_theatre === 2) {
                        this.running_list = await response.json();
                    }

                } else {
                    console.log(response.status, "Failed to load bulk " + steam)
                    throw new TypeError("Token expired"); // will check for token and push to log in
                }
            } catch (e) {
                console.log("Failed to load bulk" + steam, e)
            }
        },
        async update_show(data) {
            console.log(this.show_list[data.index])
            console.log((data.item))
            // const asd = this.appstore
            // try {
            //     this.loading = true;
            //     const response = await fetch(asd.api + '/shows', {
            //         method: 'PUT',
            //         headers: asd.getheader(),
            //         body: JSON.stringify({
            //             id: data.id,
            //             name: data.name,
            //             year: data.year,
            //             director: data.director,
            //             duration: data.duration,
            //             tags: data.tags,
            //             ticket_price: data.ticket_price,
            //             format: data.format,
            //             language: data.language,
            //             image_url : data.image_url,
            //             image_sqr: data.image_sqr,
            //             description: data.description
            //         })
            //     });
            //     if (response.status === 200) {
            //         console.log("Pushed changes to server")
            //         return await response.json()
            //     } else {
            //         console.log(response.status, "Failed to push update")
            //     }
            // } catch (e) {
            //     console.log("Failed to push update ", e)
            // }
        },
    }
})