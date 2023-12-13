<script>
import {useAppStore} from "@/store";
import {useEditorStore} from "@/store/EditorStore";

export default {
  name: "StatsView",

  data: function () {
    return {
      days: 7,
      total_revenue: 0,
      ticket_sold: 0,
      no_of_shows: 0,
      appstore: useAppStore(),
      storeE: useEditorStore(),
      theatres_list: [],
      retrieved_data: [],
      selected_theatre: null,
      search: '',
      line_series: [
        {
          name: "Revenue Collected",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8]
        },
        {
          name: "Tickets Sold",
          data: [20, 29, 37, 36, 44, 45, 50]
        }
      ],
      label_x:[],
      line_options: {
        dataLabels: {
          enabled: false
        },
        colors: ["#FF1654", "#247BA0"],

        stroke: {
          width: [4, 4],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: this.label_x,
          convertedCatToNumeric: false,
          labels: {
            style: {
              colors: '#aaa',
              fontSize: '15px'
            }
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#FF1654"
            },
            labels: {
              style: {
                colors: "#FF1654",
                fontSize: '15px'

              },
              formatter: function (value) {
                const lookup = [
                  { value: 1, symbol: "" },
                  { value: 1e3, symbol: "k" },
                  { value: 1e6, symbol: "M" },
                  { value: 1e9, symbol: "G" },
                  { value: 1e12, symbol: "T" },
                  { value: 1e15, symbol: "P" },
                  { value: 1e18, symbol: "E" }
                ];
                const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                let item = lookup.slice().reverse().find(function(item) {
                  return value >= item.value;
                });
                return "₹"+(item ? (value / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0");
              }
            },
            title: {
              text: "Revenue Collected",
              style: {
                color: "#FF1654"
              }
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#247BA0"
            },
            labels: {
              style: {
                colors: "#247BA0",
                fontSize: '15px',

              }
            },
            title: {
              text: "Tickets Sold",
              style: {
                color: "#247BA0"
              }
            }
          }
        ],
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false
          }
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
          fontSize: '14px',
          labels: {
            colors: undefined,
            useSeriesColors: true,
          },
        }
      },
      radial_series: [76, 67, 61, 90],
      radial_options: {
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle:
                0,
            endAngle:
                270,
            hollow:
                {
                  margin: 5,
                  size:
                      '30%',
                  background:
                      '#87777A',
                  image:
                  undefined,
                }
            ,
            dataLabels: {
              enabled: false,
              name: {
                enabled: false,
                show: false,
              }
              ,
              value: {
                enabled: false,
                show: false,
              }
            }
          }
        },
        colors: ['#421821', '#753033', '#532025', '#642829'],
        labels:
            ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend:
            {
              show: true,
              floating:
                  false,
              fontSize:
                  '13px',
              position:
                  'bottom',
              offsetX:
                  0,
              offsetY:
                  0,
              labels:
                  {
                    colors:'#ccc',
                    useSeriesColors: false,
                  }
              ,
              markers: {
                size: 0
              },
              formatter: function (seriesName, opts) {
                return  seriesName + ":  " + "₹" + opts.w.globals.series[opts.seriesIndex]
              }
              ,
              itemMargin: {
                vertical: 3
              }
            },

        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }]
      },
      bar_series: [
        {name: "Ticket Sold", data: []},
        {name: "Revenue", data: []},],
      bar_options: {
        title:{
          text:'Performance of each show',
          style:{
            colors:['#fff'],
            fontSize: '21px',
          }
        },
        colors: ['#421821', '#753033'],
        plotOptions: {
          bar: {
            borderRadius: 10,
            horizontal: false,
            style: {},

          }
        },
        legend:{
          fontSize: '14px',
          labels: {
            colors: '#ccc',
            useSeriesColors: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          shared: true,
          // colors: ['#565656'],
          intersect: false,
          theme: 'dark',
          y: {
            formatter: function (value, {seriesIndex,}) {
              if (seriesIndex === 1) {
                return "₹" + value
              } else {
                return value
              }
            }
          }


        },
        xaxis: {
          categories: [],
          convertedCatToNumeric: false,
          labels: {
            style: {
              colors: '#aaa',
              fontSize: '15px'
            }
          }
        },
        yaxis: [
          {
            show: false,
          },
          {
            show: false,
          }
        ]
      }
    }
  },
  beforeMount() {
    this.storeE.getData(1)
    this.theatres_list = this.storeE.theatre_list

  },
  methods: {
    async load_data() {
      this.selected_theatre = this.theatres_list.find(x => x.name === this.search)
      const asd = this.appstore

      if (this.selected_theatre) {
        try {
          this.loading = true;
          const response = await fetch(asd.api + "/stat/theatre?id=" + this.selected_theatre.id + '&days=' + this.days, {
            method: 'GET',
            headers: asd.getheader()
          });
          if (response.status === 200) {
            const content = await response.json();
            this.retrieved_data = content
            this.total_revenue = content['total_revenue']
            this.ticket_sold = content['ticket_sold']
            this.no_of_shows = content['no_of_shows']
            this.line_series = [
              {
                name: "Revenue Collected",
                data: content['revenue_per_day']
              },
              {
                name: "Tickets Sold",
                data: content['ticket_sold_per_day']
              }
            ]
            let line_options = JSON.parse(JSON.stringify(this.line_options))
            line_options.yaxis = [
              {
                axisTicks: {
                  show: false
                },
                axisBorder: {
                  show: true,
                  color: "#FF1654"
                },
                labels: {
                  style: {
                    colors: "#FF1654",
                    fontSize: '15px'

                  },
                  formatter: function (value) {
                    const lookup = [
                      { value: 1, symbol: "" },
                      { value: 1e3, symbol: "k" },
                      { value: 1e6, symbol: "M" },
                      { value: 1e9, symbol: "G" },
                      { value: 1e12, symbol: "T" },
                      { value: 1e15, symbol: "P" },
                      { value: 1e18, symbol: "E" }
                    ];
                    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                    let item = lookup.slice().reverse().find(function(item) {
                      return value >= item.value;
                    });
                    return "₹"+(item ? (value / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0");
                  }
                },
                title: {
                  text: "Revenue Collected",
                  style: {
                    color: "#FF1654"
                  }
                }
              },
              {
                opposite: true,
                axisTicks: {
                  show: false
                },
                axisBorder: {
                  show: true,
                  color: "#247BA0"
                },
                labels: {
                  style: {
                    colors: "#247BA0",
                    fontSize: '15px',
                  }
                },
                title: {
                  text: "Tickets Sold",
                  style: {
                    color: "#247BA0"
                  }
                }
              }
            ]
            line_options.xaxis.categories = content['label']
            this.line_options = line_options
            // let bar_series = JSON.parse(JSON.stringify(this.bar_series))
            // bar_series[0].data = content.bar_series[0]
            // bar_series[1].data = content.bar_series[1]
            this.bar_series = content.bar_series
            // this.bar_series = [
            //     {name: "Ticket Sold",data: content.bar_series0},
            //     {name: "Revenue", data: content.bar_series1}
            // ];

            let bar_options = JSON.parse(JSON.stringify(this.bar_options))
            bar_options.xaxis.categories = content['shows_names']
            this.bar_options = bar_options
            let r_options = JSON.parse(JSON.stringify(this.radial_options))
            r_options.labels = content['shows_names']
            this.radial_options = r_options
            console.log(content.bar_series[1])
            this.radial_series = content.bar_series[1].data.map((float) => Math.floor(float))
            this.loading = false;
          } else {
            console.log(response.status, "Failed to load bulk running")
          }
        } catch (e) {
          console.log("Failed to load bulk running ", e)
        }
      }
    }
  },
}
</script>

<template>
  <b-container id="rox" :data-bs-theme="appstore.app_theme" class="d-flex flex-column justify-content-center h-100"
               fluid>
    <div class="mb-3">
      <input v-model="search" :data-bs-theme="appstore.app_theme" class="slk h1  bg-primary"
             list="datalist" placeholder="Select a Theatre to continue" type="search"
             @change="load_data" @focusin="theatres_list = storeE.theatre_list" @focusout="load_data">
      <datalist id="datalist">
        <option v-for="x in theatres_list" :key="x.id" :value="x.name"></option>
      </datalist>
      <b-form-select v-model="days" :class="appstore.app_theme==='dark'? '':''" :data-bs-theme="appstore.app_theme"
                     class="slk h1 bg-primary text-secondary" @change="load_data">
        <b-form-select-option value="7">Last Week</b-form-select-option>
        <b-form-select-option value="15">Last 15 days</b-form-select-option>
        <b-form-select-option value="30">Last Month</b-form-select-option>
        <b-form-select-option value="365">Last Year</b-form-select-option>
      </b-form-select>
    </div>
    <b-row v-show="selected_theatre">
      <b-col class="col-12 col-md-4 ">
        <b-card class="mb-3 bg-opacity-25">
          <h4>Total Revenue</h4>
          <h1>₹{{ total_revenue }}</h1>
        </b-card>
        <b-card class="mb-3 bg-opacity-25">
          <h4>Tickets Sold</h4>
          <h1>{{ ticket_sold }}</h1>
        </b-card>
        <b-card class="mb-3 bg-opacity-25">
          <h4>Shows</h4>
          <h1>{{ no_of_shows }}</h1>
        </b-card>
        <apexchart :options="radial_options" :series="radial_series" height="390" class="mt-4" type="pie"></apexchart>
      </b-col>
      <b-col class="col-12 col-md-8 p-0 ma-0 " style="height: max-content;">
        <apexchart :options="line_options" :series="line_series" class="p-0 mb-3 bg-secondary card bg-opacity-25" type="line"></apexchart>
        <apexchart  :options="bar_options" :series="bar_series" height="430" class="p-0 mb-3 bg-secondary card bg-opacity-25"
                   type="bar"></apexchart>
      </b-col>
    </b-row>


  </b-container>
</template>

<style scoped>
.slk {
//width: 80%; padding: 10px;
  height: 90%;

  border: 1px solid #ccc;
  border-radius: 4px;
}

@media (min-width: 1080px) {
  #rox {
    min-width: 120vh;
    max-width: 1080px;
  }

}

</style>