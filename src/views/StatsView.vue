<script>
import {useAppStore} from "@/store";

export default {
  name: "StatsView",
  data: function () {
    return {
      appstore: useAppStore(),
      theatres_list: [
        "Mango",
        "Oranges",
        "Papaya",
        "Apple",
        "Manga",
      ],
      line_series: [
        {
          name: "Series A",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
          name: "Series B",
          data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
      ],
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
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
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
                colors: "#FF1654"
              }
            },
            title: {
              text: "Series A",
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
                colors: "#247BA0"
              }
            },
            title: {
              text: "Series B",
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
          offsetX: 40
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
              name: {
                show: false,
              }
              ,
              value: {
                show: false,
              }
            }
          }
        }
        ,
        colors: ['#421821', '#753033', '#532025', '#642829'],
        labels:
            ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend:
            {
              show: true,
              floating:
                  true,
              fontSize:
                  '13px',
              position:
                  'left',
              offsetX:
                  0,
              offsetY:
                  15,
              labels:
                  {
                    useSeriesColors: true,
                  }
              ,
              markers: {
                size: 0
              },
              formatter: function (seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
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
        {name: "Net Profit", data: [44, 55, 57, 56, 61, 58, 63, 60, 66]},
        {name: "Revenue", data: [76, 85, 101, 98, 87, 105, 91, 114, 94]},],
      bar_options: {
        plotOptions: {
          bar: {
            horizontal: true,
            style: {
              colors: ['#421821', '#753033'],
            },

            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 0,
          colors: ['#000']
        },
        tooltip: {
          shared: true,
          colors: ['#fff'],
          intersect: false
        },
        xaxis: {
          categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        },
      }
    }
  }
}
</script>

<template>
  <b-container id="rox" :data-bs-theme="appstore.app_theme" fluid>
    <b-row class="mb-3">
      <input :data-bs-theme="appstore.app_theme" class="slk bg-primary" list="datalist"
             placeholder="Select a Theatre to continue">
      <datalist id="datalist">
        <option v-for="x in theatres_list" :key="x" :value="x"></option>
      </datalist>

    </b-row>
    <b-row>
      <b-col class="col-12 col-md-4">
        <b-card class="mb-3">
          <h4>Total Revenue</h4>
          <h1>100</h1>
        </b-card>
        <b-card class="mb-3">
          <h4>Total views</h4>
          <h1>100</h1>
        </b-card>
        <b-card class="mb-3">
          <h4>Total views</h4>
          <h1>100</h1>
        </b-card>
        <apexchart :options="radial_options" :series="radial_series" height="390" type="radialBar"></apexchart>

      </b-col>
      <b-col class="col-12 col-md-8 p-0 ma-0 card bg-secondary bg-opacity-25" style="height: max-content;">
        <apexchart :options="line_options" :series="line_series" class="p-0" type="line"></apexchart>
      </b-col>
    </b-row>

    <apexchart :options="bar_options" :series="bar_series" height="430" type="bar"></apexchart>
  </b-container>
</template>

<style scoped>
.slk {
  width: 100%;
  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 4px;
}

@media (min-width: 1080px) {
  #rox {
    min-width: 120vh;
  }
}

</style>